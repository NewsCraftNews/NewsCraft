package ncn.newscraft.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.reflect.TypeToken;
import ncn.newscraft.domain.NewsArticle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Type;
import java.util.*;

@Service
public class ExternalApis {
    @Autowired
    RestTemplate restTemplate;
    ObjectMapper mapper=new ObjectMapper().enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);

    String newsApiUrl = "https://newsdata.io/api/1/news?apikey=pub_28913a8dcc770b2edef6b4b77131ecbf52201&country=us&timeframe=48&category=top,world";


    public List<NewsArticle> fetchNewsArticles() throws JsonProcessingException {
        //
        ParameterizedTypeReference NewsArticleType=new ParameterizedTypeReference<List<NewsArticle>>(){};

        HttpEntity<String> request=new HttpEntity<>(new HttpHeaders());
        ResponseEntity<String> response=restTemplate.exchange(newsApiUrl, HttpMethod.GET,request,String.class);
        List<NewsArticle> something=mapper.readValue(response.getBody(), new TypeReference<List<NewsArticle>>(){});

        return something;

    }
    public String fetchNewsArticlesJson(){
        //
        Type NewsArticleType=new TypeToken<List<NewsArticle>>(){}.getType();

        HttpEntity<String> request=new HttpEntity<>(new HttpHeaders());
        ResponseEntity<String> response=restTemplate.exchange(newsApiUrl, HttpMethod.GET,request,String.class);

        return response.getBody();

    }
    public void populate(){

    }


}
