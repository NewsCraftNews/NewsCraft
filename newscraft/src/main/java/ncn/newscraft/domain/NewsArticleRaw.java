package ncn.newscraft.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Entity;
import javax.persistence.Id;


@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
public class NewsArticleRaw {
    String article_id;
    String content;
    @Id
    private Long id;


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
