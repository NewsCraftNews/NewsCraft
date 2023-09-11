package ncn.newscraft.service.mapper;


import ncn.newscraft.domain.*;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.random.RandomGenerator;

@Service

public class ExternalApiMapper {
    public NewsArticle externalToInternal(NewsArticleRaw rawArticle){
        NewsArticle newsArticle=new NewsArticle();
        newsArticle.setTitle(rawArticle.getTitle());
        newsArticle.setArticleText(rawArticle.getContent());
        DateTimeFormatter formatter=DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        newsArticle.setTimePosted(ZonedDateTime.parse(rawArticle.getPubDate(),formatter));
        newsArticle.setLikes((int) (Math.random()*1000));
        return newsArticle;
    }
    public Picture getPicture(NewsArticleRaw rawArticle){
        return new Picture().imageURL(rawArticle.getImageUrl());

    }

    public UserProfile getUserProfile(NewsArticleRaw rawArticle){
        return new UserProfile().login(rawArticle.getCreator()[0]);
    }
}
