package ncn.newscraft.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ncn.newscraft.domain.NewsArticleRaw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ExternalApis {


    @Autowired
    public RestTemplate restTemplate;
    @Autowired
    public ObjectMapper mapper;

    String newsApiUrl = "https://newsdata.io/api/1/news?apikey=pub_29020fd2922d18a540758f747c11ab8c9fac7&country=us&timeframe=48&image=1";

    public List<NewsArticleRaw> fetchNewsArticles(String category, String size) throws JsonProcessingException {
        HttpEntity<String> request = new HttpEntity<>(new HttpHeaders());
        String finalURL = newsApiUrl + "&category=" + category + "&size=" + size;
        ResponseEntity<String> response = restTemplate.exchange(finalURL, HttpMethod.GET, request, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            String responseBody = response.getBody();

            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode root = objectMapper.readTree(responseBody);
                JsonNode resultsNode = root.get("results");

                if (resultsNode != null && resultsNode.isArray()) {
                    List<NewsArticleRaw> newsArticles = new ArrayList<>();
                    for (JsonNode articleNode : resultsNode) {
                        NewsArticleRaw newsArticle = objectMapper.treeToValue(articleNode, NewsArticleRaw.class);
                        newsArticles.add(newsArticle);
                    }
                    return newsArticles;
                } else {

                }
            } catch (JsonProcessingException e) {

            }
        } else {
            // Handle non-OK HTTP status code (e.g., log the error)

        }

        // Handle any other error cases here
        return Collections.emptyList(); // Return an empty list or throw an exception
    }
}





