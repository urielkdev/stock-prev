package stock.prev.user;


import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import stock.prev.address.Address;

@Entity
public class User {

	@Id
	private String cpf;
	private String name;
	private String gender;
	@Transient
	private Integer age;
	private Date birthDate;
	private String email;
	private String phone;
	@OneToOne
	private Address address;
	
	public User() {
	}
	
	public User(String cpf) {
		super();
		this.cpf = cpf;
	}
	
	public User(String cpf, String name, String gender, Integer age, Date birthDate, String email, String phone,
			Address address) {
		super();
		this.cpf = cpf;
		this.name = name;
		this.gender = gender;
		this.age = age;
		this.birthDate = birthDate;
		this.email = email;
		this.phone = phone;
		this.address = address;
	}

	public String getCpf() {
		return cpf;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
}
