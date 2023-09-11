package ncn.newscraft.service.mapper;

import ncn.newscraft.domain.NewsArticle;
import ncn.newscraft.domain.NewsArticleRaw;
import ncn.newscraft.domain.Picture;
import ncn.newscraft.domain.UserProfile;
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

    private final NewsArticleRepository newsArticleRepository;

    public ExternalApiTransactionalService(
        UserProfileRepository userProfileRepository,
        ExternalApiMapper externalApiMapper,
       PictureRepository pictureRepository,
        NewsArticleRepository newsArticleRepository){
        this.externalApiMapper=externalApiMapper;
        this.pictureRepository=pictureRepository;
        this.newsArticleRepository=newsArticleRepository;
        this.userProfileRepository=userProfileRepository;
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
        return newsArticleRepository.save(article);

        //Categories
    }


}
