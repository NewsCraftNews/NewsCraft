package ncn.newscraft.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import ncn.newscraft.IntegrationTest;
import ncn.newscraft.domain.BookMark;
import ncn.newscraft.repository.BookMarkRepository;
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
 * Integration tests for the {@link BookMarkResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class BookMarkResourceIT {

    private static final String ENTITY_API_URL = "/api/book-marks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BookMarkRepository bookMarkRepository;

    @Mock
    private BookMarkRepository bookMarkRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBookMarkMockMvc;

    private BookMark bookMark;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BookMark createEntity(EntityManager em) {
        BookMark bookMark = new BookMark();
        return bookMark;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BookMark createUpdatedEntity(EntityManager em) {
        BookMark bookMark = new BookMark();
        return bookMark;
    }

    @BeforeEach
    public void initTest() {
        bookMark = createEntity(em);
    }

    @Test
    @Transactional
    void createBookMark() throws Exception {
        int databaseSizeBeforeCreate = bookMarkRepository.findAll().size();
        // Create the BookMark
        restBookMarkMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bookMark)))
            .andExpect(status().isCreated());

        // Validate the BookMark in the database
        List<BookMark> bookMarkList = bookMarkRepository.findAll();
        assertThat(bookMarkList).hasSize(databaseSizeBeforeCreate + 1);
        BookMark testBookMark = bookMarkList.get(bookMarkList.size() - 1);
    }

    @Test
    @Transactional
    void createBookMarkWithExistingId() throws Exception {
        // Create the BookMark with an existing ID
        bookMark.setId(1L);

        int databaseSizeBeforeCreate = bookMarkRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBookMarkMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bookMark)))
            .andExpect(status().isBadRequest());

        // Validate the BookMark in the database
        List<BookMark> bookMarkList = bookMarkRepository.findAll();
        assertThat(bookMarkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBookMarks() throws Exception {
        // Initialize the database
        bookMarkRepository.saveAndFlush(bookMark);

        // Get all the bookMarkList
        restBookMarkMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bookMark.getId().intValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBookMarksWithEagerRelationshipsIsEnabled() throws Exception {
        when(bookMarkRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBookMarkMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(bookMarkRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBookMarksWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(bookMarkRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBookMarkMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(bookMarkRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getBookMark() throws Exception {
        // Initialize the database
        bookMarkRepository.saveAndFlush(bookMark);

        // Get the bookMark
        restBookMarkMockMvc
            .perform(get(ENTITY_API_URL_ID, bookMark.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bookMark.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingBookMark() throws Exception {
        // Get the bookMark
        restBookMarkMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingBookMark() throws Exception {
        // Initialize the database
        bookMarkRepository.saveAndFlush(bookMark);

        int databaseSizeBeforeUpdate = bookMarkRepository.findAll().size();

        // Update the bookMark
        BookMark updatedBookMark = bookMarkRepository.findById(bookMark.getId()).get();
        // Disconnect from session so that the updates on updatedBookMark are not directly saved in db
        em.detach(updatedBookMark);

        restBookMarkMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBookMark.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBookMark))
            )
            .andExpect(status().isOk());

        // Validate the BookMark in the database
        List<BookMark> bookMarkList = bookMarkRepository.findAll();
        assertThat(bookMarkList).hasSize(databaseSizeBeforeUpdate);
        BookMark testBookMark = bookMarkList.get(bookMarkList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingBookMark() throws Exception {
        int databaseSizeBeforeUpdate = bookMarkRepository.findAll().size();
        bookMark.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBookMarkMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bookMark.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(bookMark))
            )
            .andExpect(status().isBadRequest());

        // Validate the BookMark in the database
        List<BookMark> bookMarkList = bookMarkRepository.findAll();
        assertThat(bookMarkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBookMark() throws Exception {
        int databaseSizeBeforeUpdate = bookMarkRepository.findAll().size();
        bookMark.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBookMarkMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(bookMark))
            )
            .andExpect(status().isBadRequest());

        // Validate the BookMark in the database
        List<BookMark> bookMarkList = bookMarkRepository.findAll();
        assertThat(bookMarkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBookMark() throws Exception {
        int databaseSizeBeforeUpdate = bookMarkRepository.findAll().size();
        bookMark.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBookMarkMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(bookMark)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BookMark in the database
        List<BookMark> bookMarkList = bookMarkRepository.findAll();
        assertThat(bookMarkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBookMarkWithPatch() throws Exception {
        // Initialize the database
        bookMarkRepository.saveAndFlush(bookMark);

        int databaseSizeBeforeUpdate = bookMarkRepository.findAll().size();

        // Update the bookMark using partial update
        BookMark partialUpdatedBookMark = new BookMark();
        partialUpdatedBookMark.setId(bookMark.getId());

        restBookMarkMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBookMark.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBookMark))
            )
            .andExpect(status().isOk());

        // Validate the BookMark in the database
        List<BookMark> bookMarkList = bookMarkRepository.findAll();
        assertThat(bookMarkList).hasSize(databaseSizeBeforeUpdate);
        BookMark testBookMark = bookMarkList.get(bookMarkList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateBookMarkWithPatch() throws Exception {
        // Initialize the database
        bookMarkRepository.saveAndFlush(bookMark);

        int databaseSizeBeforeUpdate = bookMarkRepository.findAll().size();

        // Update the bookMark using partial update
        BookMark partialUpdatedBookMark = new BookMark();
        partialUpdatedBookMark.setId(bookMark.getId());

        restBookMarkMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBookMark.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBookMark))
            )
            .andExpect(status().isOk());

        // Validate the BookMark in the database
        List<BookMark> bookMarkList = bookMarkRepository.findAll();
        assertThat(bookMarkList).hasSize(databaseSizeBeforeUpdate);
        BookMark testBookMark = bookMarkList.get(bookMarkList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingBookMark() throws Exception {
        int databaseSizeBeforeUpdate = bookMarkRepository.findAll().size();
        bookMark.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBookMarkMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, bookMark.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(bookMark))
            )
            .andExpect(status().isBadRequest());

        // Validate the BookMark in the database
        List<BookMark> bookMarkList = bookMarkRepository.findAll();
        assertThat(bookMarkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBookMark() throws Exception {
        int databaseSizeBeforeUpdate = bookMarkRepository.findAll().size();
        bookMark.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBookMarkMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(bookMark))
            )
            .andExpect(status().isBadRequest());

        // Validate the BookMark in the database
        List<BookMark> bookMarkList = bookMarkRepository.findAll();
        assertThat(bookMarkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBookMark() throws Exception {
        int databaseSizeBeforeUpdate = bookMarkRepository.findAll().size();
        bookMark.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBookMarkMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(bookMark)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BookMark in the database
        List<BookMark> bookMarkList = bookMarkRepository.findAll();
        assertThat(bookMarkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBookMark() throws Exception {
        // Initialize the database
        bookMarkRepository.saveAndFlush(bookMark);

        int databaseSizeBeforeDelete = bookMarkRepository.findAll().size();

        // Delete the bookMark
        restBookMarkMockMvc
            .perform(delete(ENTITY_API_URL_ID, bookMark.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BookMark> bookMarkList = bookMarkRepository.findAll();
        assertThat(bookMarkList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
