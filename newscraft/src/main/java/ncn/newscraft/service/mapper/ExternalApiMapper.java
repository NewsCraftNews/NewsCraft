package ncn.newscraft.service.mapper;


import com.fasterxml.jackson.core.JsonProcessingException;
import ncn.newscraft.domain.*;
import ncn.newscraft.service.ExternalApis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;



@Service

public class ExternalApiMapper {



    public NewsArticle externalToInternal(NewsArticleRaw rawArticle){
        NewsArticle newsArticle=new NewsArticle();
        newsArticle.setTitle(rawArticle.getTitle());
        newsArticle.setArticleText(rawArticle.getContent());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String inputDate = rawArticle.getPubDate().trim();
        LocalDateTime localDateTime = LocalDateTime.parse(inputDate, formatter);
        ZoneId zoneId = ZoneId.of("America/New_York");
        ZonedDateTime zonedDateTime = localDateTime.atZone(zoneId);
        newsArticle.setTimePosted(zonedDateTime);
        newsArticle.setLikes((int) (Math.random()*1000));
        return newsArticle;
    }
    public Picture getPicture(NewsArticleRaw rawArticle){
        return new Picture().imageURL(rawArticle.getImageUrl());

    }

    public String getUserProfileLogin(NewsArticleRaw rawArticle){
        if(rawArticle.getCreator() == null){
            return "Anonymous Writer";
        }
        return rawArticle.getCreator()[0];
    }
}
