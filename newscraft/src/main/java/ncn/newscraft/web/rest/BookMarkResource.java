package ncn.newscraft.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import ncn.newscraft.domain.BookMark;
import ncn.newscraft.repository.BookMarkRepository;
import ncn.newscraft.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link ncn.newscraft.domain.BookMark}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BookMarkResource {

    private final Logger log = LoggerFactory.getLogger(BookMarkResource.class);

    private static final String ENTITY_NAME = "bookMark";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BookMarkRepository bookMarkRepository;

    public BookMarkResource(BookMarkRepository bookMarkRepository) {
        this.bookMarkRepository = bookMarkRepository;
    }

    /**
     * {@code POST  /book-marks} : Create a new bookMark.
     *
     * @param bookMark the bookMark to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bookMark, or with status {@code 400 (Bad Request)} if the bookMark has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/book-marks")
    public ResponseEntity<BookMark> createBookMark(@RequestBody BookMark bookMark) throws URISyntaxException {
        log.debug("REST request to save BookMark : {}", bookMark);
        if (bookMark.getId() != null) {
            throw new BadRequestAlertException("A new bookMark cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BookMark result = bookMarkRepository.save(bookMark);
        return ResponseEntity
            .created(new URI("/api/book-marks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /book-marks/:id} : Updates an existing bookMark.
     *
     * @param id the id of the bookMark to save.
     * @param bookMark the bookMark to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bookMark,
     * or with status {@code 400 (Bad Request)} if the bookMark is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bookMark couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/book-marks/{id}")
    public ResponseEntity<BookMark> updateBookMark(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BookMark bookMark
    ) throws URISyntaxException {
        log.debug("REST request to update BookMark : {}, {}", id, bookMark);
        if (bookMark.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bookMark.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bookMarkRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        BookMark result = bookMarkRepository.save(bookMark);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bookMark.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /book-marks/:id} : Partial updates given fields of an existing bookMark, field will ignore if it is null
     *
     * @param id the id of the bookMark to save.
     * @param bookMark the bookMark to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bookMark,
     * or with status {@code 400 (Bad Request)} if the bookMark is not valid,
     * or with status {@code 404 (Not Found)} if the bookMark is not found,
     * or with status {@code 500 (Internal Server Error)} if the bookMark couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/book-marks/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BookMark> partialUpdateBookMark(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody BookMark bookMark
    ) throws URISyntaxException {
        log.debug("REST request to partial update BookMark partially : {}, {}", id, bookMark);
        if (bookMark.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bookMark.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bookMarkRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BookMark> result = bookMarkRepository
            .findById(bookMark.getId())
            .map(existingBookMark -> {
                return existingBookMark;
            })
            .map(bookMarkRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bookMark.getId().toString())
        );
    }

    /**
     * {@code GET  /book-marks} : get all the bookMarks.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bookMarks in body.
     */
    @GetMapping("/book-marks")
    public List<BookMark> getAllBookMarks(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all BookMarks");
        if (eagerload) {
            return bookMarkRepository.findAllWithEagerRelationships();
        } else {
            return bookMarkRepository.findAll();
        }
    }

    /**
     * {@code GET  /book-marks/:id} : get the "id" bookMark.
     *
     * @param id the id of the bookMark to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bookMark, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/book-marks/{id}")
    public ResponseEntity<BookMark> getBookMark(@PathVariable Long id) {
        log.debug("REST request to get BookMark : {}", id);
        Optional<BookMark> bookMark = bookMarkRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(bookMark);
    }

    /**
     * {@code DELETE  /book-marks/:id} : delete the "id" bookMark.
     *
     * @param id the id of the bookMark to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/book-marks/{id}")
    public ResponseEntity<Void> deleteBookMark(@PathVariable Long id) {
        log.debug("REST request to delete BookMark : {}", id);
        bookMarkRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
