package stock.prev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
@RestController
public class StockPrevBack {

	public static void main(String[] args) {
		SpringApplication.run(StockPrevBack.class, args);
	}
	
	@Configuration
	@EnableWebMvc
	public class WebConfig extends WebMvcConfigurerAdapter {

		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "DELETE");
		}
	}

}
