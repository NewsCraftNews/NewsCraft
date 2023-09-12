package ncn.newscraft.service.mapper;

import ncn.newscraft.domain.*;
import ncn.newscraft.repository.CategoryRepository;
import ncn.newscraft.repository.NewsArticleRepository;
import ncn.newscraft.repository.PictureRepository;
import ncn.newscraft.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ExternalApiTransactionalService {
    private final UserProfileRepository userProfileRepository;
    private final ExternalApiMapper externalApiMapper;
    private final PictureRepository pictureRepository;
    private final CategoryRepository categoryRepository;

    private final NewsArticleRepository newsArticleRepository;

    public ExternalApiTransactionalService(
        UserProfileRepository userProfileRepository,
        ExternalApiMapper externalApiMapper,
       PictureRepository pictureRepository,
        CategoryRepository categoryRepository,
        NewsArticleRepository newsArticleRepository){
        this.externalApiMapper=externalApiMapper;
        this.pictureRepository=pictureRepository;
        this.newsArticleRepository=newsArticleRepository;
        this.userProfileRepository=userProfileRepository;
        this.categoryRepository = categoryRepository;
    }
    public List<NewsArticle> saveToDataBase(List<NewsArticleRaw> newsArticleRawList){
        return newsArticleRawList.stream().map(this::saveSingleArticle).collect(Collectors.toList());

    }
    public NewsArticle saveSingleArticle(NewsArticleRaw newsArticleRaw){
        //Convert from newsArticle Raw to news Article
        NewsArticle article=externalApiMapper.externalToInternal(newsArticleRaw);

        //Save pictue
        Picture picture= externalApiMapper.getPicture(newsArticleRaw);
        Picture savedPicture=pictureRepository.save(picture);
        //Save User Profile
        UserProfile userProfile = externalApiMapper.getUserProfile(newsArticleRaw);
        UserProfile userProfile1 = userProfileRepository.save(userProfile);

        //Save News Article
        article.setPicture(savedPicture);
        article.setAuthor(userProfile1);

        //Categories
        for(String s: newsArticleRaw.getCategory()) {
            Category category = findOrMakeNewCategory(capitalize(s));
            article.addCategories(category);
        }

        return newsArticleRepository.save(article);
    }

    private String capitalize(String input){
        return Character.toUpperCase(input.charAt(0)) + input.substring(1).toLowerCase();
    }

    private Category findOrMakeNewCategory(String s) {
        List<Category> listOfCategories = categoryRepository.findAll()
            .stream()
            .filter(category -> category.getName() != null)
            .filter(category -> category.getName().equals(s))
            .collect(Collectors.toList());
        if(listOfCategories.isEmpty()){
            // create new category in repository
            return categoryRepository.save(new Category().name(s));
        }
        // otherwise return the category found
        return listOfCategories.get(0);
    }


}
