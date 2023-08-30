package ncn.newscraft.web.rest;

import static ncn.newscraft.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import ncn.newscraft.IntegrationTest;
import ncn.newscraft.domain.NewsArticle;
import ncn.newscraft.repository.NewsArticleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link NewsArticleResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class NewsArticleResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_ARTICLE_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_ARTICLE_TEXT = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_TIME_POSTED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME_POSTED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_LIKES = 1;
    private static final Integer UPDATED_LIKES = 2;

    private static final String ENTITY_API_URL = "/api/news-articles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private NewsArticleRepository newsArticleRepository;

    @Mock
    private NewsArticleRepository newsArticleRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNewsArticleMockMvc;

    private NewsArticle newsArticle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NewsArticle createEntity(EntityManager em) {
        NewsArticle newsArticle = new NewsArticle()
            .title(DEFAULT_TITLE)
            .articleText(DEFAULT_ARTICLE_TEXT)
            .timePosted(DEFAULT_TIME_POSTED)
            .likes(DEFAULT_LIKES);
        return newsArticle;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NewsArticle createUpdatedEntity(EntityManager em) {
        NewsArticle newsArticle = new NewsArticle()
            .title(UPDATED_TITLE)
            .articleText(UPDATED_ARTICLE_TEXT)
            .timePosted(UPDATED_TIME_POSTED)
            .likes(UPDATED_LIKES);
        return newsArticle;
    }

    @BeforeEach
    public void initTest() {
        newsArticle = createEntity(em);
    }

    @Test
    @Transactional
    void createNewsArticle() throws Exception {
        int databaseSizeBeforeCreate = newsArticleRepository.findAll().size();
        // Create the NewsArticle
        restNewsArticleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(newsArticle)))
            .andExpect(status().isCreated());

        // Validate the NewsArticle in the database
        List<NewsArticle> newsArticleList = newsArticleRepository.findAll();
        assertThat(newsArticleList).hasSize(databaseSizeBeforeCreate + 1);
        NewsArticle testNewsArticle = newsArticleList.get(newsArticleList.size() - 1);
        assertThat(testNewsArticle.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testNewsArticle.getArticleText()).isEqualTo(DEFAULT_ARTICLE_TEXT);
        assertThat(testNewsArticle.getTimePosted()).isEqualTo(DEFAULT_TIME_POSTED);
        assertThat(testNewsArticle.getLikes()).isEqualTo(DEFAULT_LIKES);
    }

    @Test
    @Transactional
    void createNewsArticleWithExistingId() throws Exception {
        // Create the NewsArticle with an existing ID
        newsArticle.setId(1L);

        int databaseSizeBeforeCreate = newsArticleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNewsArticleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(newsArticle)))
            .andExpect(status().isBadRequest());

        // Validate the NewsArticle in the database
        List<NewsArticle> newsArticleList = newsArticleRepository.findAll();
        assertThat(newsArticleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllNewsArticles() throws Exception {
        // Initialize the database
        newsArticleRepository.saveAndFlush(newsArticle);

        // Get all the newsArticleList
        restNewsArticleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(newsArticle.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].articleText").value(hasItem(DEFAULT_ARTICLE_TEXT)))
            .andExpect(jsonPath("$.[*].timePosted").value(hasItem(sameInstant(DEFAULT_TIME_POSTED))))
            .andExpect(jsonPath("$.[*].likes").value(hasItem(DEFAULT_LIKES)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllNewsArticlesWithEagerRelationshipsIsEnabled() throws Exception {
        when(newsArticleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restNewsArticleMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(newsArticleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllNewsArticlesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(newsArticleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restNewsArticleMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(newsArticleRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getNewsArticle() throws Exception {
        // Initialize the database
        newsArticleRepository.saveAndFlush(newsArticle);

        // Get the newsArticle
        restNewsArticleMockMvc
            .perform(get(ENTITY_API_URL_ID, newsArticle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(newsArticle.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.articleText").value(DEFAULT_ARTICLE_TEXT))
            .andExpect(jsonPath("$.timePosted").value(sameInstant(DEFAULT_TIME_POSTED)))
            .andExpect(jsonPath("$.likes").value(DEFAULT_LIKES));
    }

    @Test
    @Transactional
    void getNonExistingNewsArticle() throws Exception {
        // Get the newsArticle
        restNewsArticleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingNewsArticle() throws Exception {
        // Initialize the database
        newsArticleRepository.saveAndFlush(newsArticle);

        int databaseSizeBeforeUpdate = newsArticleRepository.findAll().size();

        // Update the newsArticle
        NewsArticle updatedNewsArticle = newsArticleRepository.findById(newsArticle.getId()).get();
        // Disconnect from session so that the updates on updatedNewsArticle are not directly saved in db
        em.detach(updatedNewsArticle);
        updatedNewsArticle.title(UPDATED_TITLE).articleText(UPDATED_ARTICLE_TEXT).timePosted(UPDATED_TIME_POSTED).likes(UPDATED_LIKES);

        restNewsArticleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedNewsArticle.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedNewsArticle))
            )
            .andExpect(status().isOk());

        // Validate the NewsArticle in the database
        List<NewsArticle> newsArticleList = newsArticleRepository.findAll();
        assertThat(newsArticleList).hasSize(databaseSizeBeforeUpdate);
        NewsArticle testNewsArticle = newsArticleList.get(newsArticleList.size() - 1);
        assertThat(testNewsArticle.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testNewsArticle.getArticleText()).isEqualTo(UPDATED_ARTICLE_TEXT);
        assertThat(testNewsArticle.getTimePosted()).isEqualTo(UPDATED_TIME_POSTED);
        assertThat(testNewsArticle.getLikes()).isEqualTo(UPDATED_LIKES);
    }

    @Test
    @Transactional
    void putNonExistingNewsArticle() throws Exception {
        int databaseSizeBeforeUpdate = newsArticleRepository.findAll().size();
        newsArticle.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNewsArticleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, newsArticle.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(newsArticle))
            )
            .andExpect(status().isBadRequest());

        // Validate the NewsArticle in the database
        List<NewsArticle> newsArticleList = newsArticleRepository.findAll();
        assertThat(newsArticleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNewsArticle() throws Exception {
        int databaseSizeBeforeUpdate = newsArticleRepository.findAll().size();
        newsArticle.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNewsArticleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(newsArticle))
            )
            .andExpect(status().isBadRequest());

        // Validate the NewsArticle in the database
        List<NewsArticle> newsArticleList = newsArticleRepository.findAll();
        assertThat(newsArticleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNewsArticle() throws Exception {
        int databaseSizeBeforeUpdate = newsArticleRepository.findAll().size();
        newsArticle.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNewsArticleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(newsArticle)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the NewsArticle in the database
        List<NewsArticle> newsArticleList = newsArticleRepository.findAll();
        assertThat(newsArticleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNewsArticleWithPatch() throws Exception {
        // Initialize the database
        newsArticleRepository.saveAndFlush(newsArticle);

        int databaseSizeBeforeUpdate = newsArticleRepository.findAll().size();

        // Update the newsArticle using partial update
        NewsArticle partialUpdatedNewsArticle = new NewsArticle();
        partialUpdatedNewsArticle.setId(newsArticle.getId());

        partialUpdatedNewsArticle.title(UPDATED_TITLE).timePosted(UPDATED_TIME_POSTED).likes(UPDATED_LIKES);

        restNewsArticleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNewsArticle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNewsArticle))
            )
            .andExpect(status().isOk());

        // Validate the NewsArticle in the database
        List<NewsArticle> newsArticleList = newsArticleRepository.findAll();
        assertThat(newsArticleList).hasSize(databaseSizeBeforeUpdate);
        NewsArticle testNewsArticle = newsArticleList.get(newsArticleList.size() - 1);
        assertThat(testNewsArticle.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testNewsArticle.getArticleText()).isEqualTo(DEFAULT_ARTICLE_TEXT);
        assertThat(testNewsArticle.getTimePosted()).isEqualTo(UPDATED_TIME_POSTED);
        assertThat(testNewsArticle.getLikes()).isEqualTo(UPDATED_LIKES);
    }

    @Test
    @Transactional
    void fullUpdateNewsArticleWithPatch() throws Exception {
        // Initialize the database
        newsArticleRepository.saveAndFlush(newsArticle);

        int databaseSizeBeforeUpdate = newsArticleRepository.findAll().size();

        // Update the newsArticle using partial update
        NewsArticle partialUpdatedNewsArticle = new NewsArticle();
        partialUpdatedNewsArticle.setId(newsArticle.getId());

        partialUpdatedNewsArticle
            .title(UPDATED_TITLE)
            .articleText(UPDATED_ARTICLE_TEXT)
            .timePosted(UPDATED_TIME_POSTED)
            .likes(UPDATED_LIKES);

        restNewsArticleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNewsArticle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNewsArticle))
            )
            .andExpect(status().isOk());

        // Validate the NewsArticle in the database
        List<NewsArticle> newsArticleList = newsArticleRepository.findAll();
        assertThat(newsArticleList).hasSize(databaseSizeBeforeUpdate);
        NewsArticle testNewsArticle = newsArticleList.get(newsArticleList.size() - 1);
        assertThat(testNewsArticle.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testNewsArticle.getArticleText()).isEqualTo(UPDATED_ARTICLE_TEXT);
        assertThat(testNewsArticle.getTimePosted()).isEqualTo(UPDATED_TIME_POSTED);
        assertThat(testNewsArticle.getLikes()).isEqualTo(UPDATED_LIKES);
    }

    @Test
    @Transactional
    void patchNonExistingNewsArticle() throws Exception {
        int databaseSizeBeforeUpdate = newsArticleRepository.findAll().size();
        newsArticle.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNewsArticleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, newsArticle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(newsArticle))
            )
            .andExpect(status().isBadRequest());

        // Validate the NewsArticle in the database
        List<NewsArticle> newsArticleList = newsArticleRepository.findAll();
        assertThat(newsArticleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNewsArticle() throws Exception {
        int databaseSizeBeforeUpdate = newsArticleRepository.findAll().size();
        newsArticle.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNewsArticleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(newsArticle))
            )
            .andExpect(status().isBadRequest());

        // Validate the NewsArticle in the database
        List<NewsArticle> newsArticleList = newsArticleRepository.findAll();
        assertThat(newsArticleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNewsArticle() throws Exception {
        int databaseSizeBeforeUpdate = newsArticleRepository.findAll().size();
        newsArticle.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNewsArticleMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(newsArticle))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the NewsArticle in the database
        List<NewsArticle> newsArticleList = newsArticleRepository.findAll();
        assertThat(newsArticleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNewsArticle() throws Exception {
        // Initialize the database
        newsArticleRepository.saveAndFlush(newsArticle);

        int databaseSizeBeforeDelete = newsArticleRepository.findAll().size();

        // Delete the newsArticle
        restNewsArticleMockMvc
            .perform(delete(ENTITY_API_URL_ID, newsArticle.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NewsArticle> newsArticleList = newsArticleRepository.findAll();
        assertThat(newsArticleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
