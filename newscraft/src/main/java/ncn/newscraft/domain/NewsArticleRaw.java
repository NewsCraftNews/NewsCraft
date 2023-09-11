package ncn.newscraft.domain;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;


@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class NewsArticleRaw {

    @JsonProperty("article_id")
    private String article_id;
    @JsonProperty("title")
    private String title;
    @JsonProperty("creator")
    @JsonAlias("author") // You can use JsonAlias if "creator" is also known as "author" in the JSON
    private String[] creator;


    @JsonProperty("content")
    private String content;

    @JsonProperty("pubDate")
    private String pubDate;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("category")
    private String[] category;




    @SuppressWarnings("unchecked")
    @JsonProperty("results")
    private void unpackNested(Map<String,Object> brand) {
        this.content = (String)brand.get("content");
    }

    public String getArticle_id() {
        return article_id;
    }

    public void setArticle_id(String article_id) {
        this.article_id = article_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String[] getCreator() {
        return creator;
    }

    public void setCreator(String[] creator) {
        this.creator = creator;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPubDate() {
        return pubDate;
    }

    public void setPubDate(String pubDate) {
        this.pubDate=pubDate;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }



    public String[] getCategory() {
        return category;
    }

    public void setCategory(String[] category) {
        this.category = category;
    }
}
