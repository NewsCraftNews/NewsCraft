package ncn.newscraft.web.rest;

import ncn.newscraft.domain.BookMark;
import ncn.newscraft.domain.User;
import ncn.newscraft.domain.UserProfile;
import ncn.newscraft.repository.BookMarkRepository;
import ncn.newscraft.repository.UserProfileRepository;
import ncn.newscraft.repository.UserRepository;
import ncn.newscraft.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@Transactional
public class UserBookmarksResource {

    private final Logger log = LoggerFactory.getLogger(BookMarkResource.class);

    private static final String ENTITY_NAME = "bookmark";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BookMarkRepository bookMarkRepository;

    private final UserProfileRepository userProfileRepository;

    private final UserRepository userRepository;

    public UserBookmarksResource(
        BookMarkRepository bookMarkRepository,
        UserProfileRepository userProfileRepository,
        UserRepository userRepository) {
        this.bookMarkRepository = bookMarkRepository;
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code GET  /book-marks/:login} : get the bookMarks associated with this login.
     *
     * @param login the login to get the bookmarks of
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bookMarks, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user/{login}/bookmarks")
    public List<BookMark> getAllBookmarks(@PathVariable String login) {
        log.debug("REST request to get BookMark for User : {}", login);
        // check for user profile associated with account
        UserProfile up = findUserProfileByLogin(login);

        return bookMarkRepository.findAllWithEagerRelationships()
            .stream()
            .filter(bm -> bm.getCreatedBy() != null)
            .filter(bm -> bm.getCreatedBy().getId().equals(up.getId()))
            .collect(Collectors.toList());
    }

    private UserProfile findUserProfileByLogin(String login){
        // look for the user profile first
        List<UserProfile> upList = userProfileRepository.findAllWithEagerRelationships()
            .stream()
            .filter(userProfile -> userProfile.getUser() != null)
            .filter(userProfile -> userProfile.getUser().getLogin() != null)
            .filter(userProfile -> userProfile.getUser().getLogin().equals(login))
            .collect(Collectors.toList());
        if(upList.isEmpty()){
            // look for user first
            User user = userRepository.findOneByLogin(login).get();
            // create you a user profile and return it
            UserProfile newProfile = new UserProfile();
            newProfile.setUser(user);
            return userProfileRepository.save(newProfile);
        }
        return upList.get(0);
    }

    /**
     * {@code POST  /book-marks/:login} : create a bookMark associated with this login
     *
     * @param login the login to create bookmark under
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bookMark, or with status {@code 404 (Not Found)}.
     */
    @PostMapping("/user/{login}/bookmarks")
    public ResponseEntity<BookMark> saveBookMark(@PathVariable String login, @RequestBody BookMark bookMark) throws URISyntaxException {
        log.debug("REST request to save BookMark for User : {}", login);
        if (bookMark.getId() != null) {
            throw new BadRequestAlertException("A new bookMark cannot already have an ID", ENTITY_NAME, "idexists");
        }
        // look for user profile associated with account
        UserProfile up = findUserProfileByLogin(login);
        bookMark.setCreatedBy(up);

        BookMark result = bookMarkRepository.save(bookMark);
        return ResponseEntity
            .created(new URI("/api/book-marks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /book-marks/:login} : get the bookMarks associated with this login.
     *
     * @param login the login to get the bookmarks of
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bookMarks, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user/{login}/bookmark")
    public ResponseEntity<BookMark> getBookmarkForUser(@PathVariable String login, @RequestParam Long articleid) {
        log.debug("REST request to get BookMark for User {} for Article {}", login, articleid);
        // check for user profile associated with account
        UserProfile up = findUserProfileByLogin(login);

        List<BookMark> userBookmarks = bookMarkRepository.findAllWithEagerRelationships()
            .stream()
            .filter(bm -> bm.getCreatedBy() != null)
            .filter(bm -> bm.getCreatedBy().getId().equals(up.getId()))
            .filter(bm -> bm.getLinksTo() != null)
            .filter(bm -> bm.getLinksTo().getId().equals(articleid))
            .collect(Collectors.toList());
        if(!userBookmarks.isEmpty()){
            return new ResponseEntity<>(userBookmarks.get(0), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
