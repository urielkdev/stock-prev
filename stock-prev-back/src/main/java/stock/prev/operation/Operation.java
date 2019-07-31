package stock.prev.operation;


import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import stock.prev.user.User;

@Entity
public class Operation {

	@Id
	@GeneratedValue
	private Integer id;
	private Double value;
	private Date date;
	private String type;
	// FetchType.LAZY to not overload the return with the entire user
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private User user;

	public Operation() {
	}

	public Integer getId() {
		return id;
	}

	public Operation(Double value, Date date, String type, User user) {
		super();
		this.value = value;
		this.date = date;
		this.type = type;
		this.user = user;
	}

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
