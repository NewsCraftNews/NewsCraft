package ncn.newscraft.web.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import ncn.newscraft.domain.NewsArticle;
import ncn.newscraft.domain.NewsArticleRaw;
import ncn.newscraft.service.ExternalApis;
import ncn.newscraft.service.mapper.ExternalApiTransactionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/news")

public class RawToNewsArticle {

    @Autowired
    private ExternalApiTransactionalService newsArticleService;
    @Autowired
    ExternalApis externalApis=new ExternalApis();

    @GetMapping("/fetch-and-save")
    public ResponseEntity<String> fetchAndSaveNews() throws JsonProcessingException {
        // Fetch news articles from the external API
        List<NewsArticleRaw> articles = externalApis.fetchNewsArticles(); // Fetch and map raw articles here
            // Save the articles to the database
            newsArticleService.saveToDataBase(articles);
        return ResponseEntity.ok("News articles saved successfully.");
    }

}
