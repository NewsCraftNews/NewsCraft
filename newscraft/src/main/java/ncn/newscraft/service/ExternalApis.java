package ncn.newscraft.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ncn.newscraft.domain.NewsArticle;
import ncn.newscraft.domain.NewsArticleRaw;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
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

    String newsApiUrl = "https://newsdata.io/api/1/news?apikey=pub_28913a8dcc770b2edef6b4b77131ecbf52201&country=us&timeframe=48&category=top,world&size=1";

    public List<NewsArticleRaw> fetchNewsArticles() throws JsonProcessingException {
        HttpEntity<String> request = new HttpEntity<>(new HttpHeaders());
        ResponseEntity<String> response = restTemplate.exchange(newsApiUrl, HttpMethod.GET, request, String.class);

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

    public Long convertStringToLong(String input) {
        // Remove all non-digit characters (letters) from the input string
        String numericString = input.replaceAll("[^0-9]", "");

        try {
            // Attempt to parse the numeric string into a Long
            return Long.parseLong(numericString);
        } catch (NumberFormatException e) {
            // Handle the case where the input doesn't represent a valid Long
            System.err.println("Invalid input: " + input);
            return 0L; // You can choose a different default value if needed
        }
    }
}





//    //OLD METHODS THESE DONT WORK
//    public String fetchNewsArticlesJson(){
//
//        HttpEntity<String> request=new HttpEntity<>(new HttpHeaders());
//        ResponseEntity<String> response=restTemplate.exchange(newsApiUrl, HttpMethod.GET,request,String.class);
//
//            return response.getBody();
//
//
//    }
//
//
//    public List<NewsArticleRaw> fetchNewsArticlesold() throws JsonProcessingException {
//        //
//        ParameterizedTypeReference<List<NewsArticle>> NewsArticleType=new ParameterizedTypeReference<>(){};
//
//        HttpEntity<String> request=new HttpEntity<>(new HttpHeaders());
//        ResponseEntity<String> response=restTemplate.exchange(newsApiUrl, HttpMethod.GET,request,String.class);
//        List<NewsArticleRaw> something=mapper.readValue(response.getBody(), new TypeReference<List<NewsArticleRaw>>(){});
//
//        return something;
//
//    }
//    public List<NewsArticleRaw> fetchNewsArticl() throws JsonProcessingException {
//        HttpHeaders headers = new HttpHeaders();
//        HttpEntity<String> request = new HttpEntity<>(headers);
//
//        ResponseEntity<String> response = restTemplate.exchange(newsApiUrl, HttpMethod.GET, request, String.class);
//
//        String responseBody = response.getBody();
//        return mapper.readValue(responseBody, new TypeReference<List<NewsArticleRaw>>() {});
//
//    }




