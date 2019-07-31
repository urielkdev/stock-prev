package stock.prev.address;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Address {

	@Id
	@GeneratedValue
	private Integer addressId;
	private String addressCep;
	private String addressState;
	private String addressCity;
	private String addressDistrict;
	private String addressStreet;
	private String addressNumber;
	private String addressComplement;
	
	public Address() {
	}

	public Address(Integer addressId) {
		super();
		this.addressId = addressId;
	}

	public Address(String addressCep, String addressState, String addressCity, String addressDistrict,
			String addressStreet, String addressNumber, String addressComplement) {
		super();
		this.addressCep = addressCep;
		this.addressState = addressState;
		this.addressCity = addressCity;
		this.addressDistrict = addressDistrict;
		this.addressStreet = addressStreet;
		this.addressNumber = addressNumber;
		this.addressComplement = addressComplement;
	}

	public Integer getAddressId() {
		return addressId;
	}

	public String getAddressCep() {
		return addressCep;
	}

	public void setAddressCep(String addressCep) {
		this.addressCep = addressCep;
	}

	public String getAddressState() {
		return addressState;
	}

	public void setAddressState(String addressState) {
		this.addressState = addressState;
	}

	public String getAddressCity() {
		return addressCity;
	}

	public void setAddressCity(String addressCity) {
		this.addressCity = addressCity;
	}

	public String getAddressDistrict() {
		return addressDistrict;
	}

	public void setAddressDistrict(String addressDistrict) {
		this.addressDistrict = addressDistrict;
	}

	public String getAddressStreet() {
		return addressStreet;
	}

	public void setAddressStreet(String addressStreet) {
		this.addressStreet = addressStreet;
	}

	public String getAddressNumber() {
		return addressNumber;
	}

	public void setAddressNumber(String addressNumber) {
		this.addressNumber = addressNumber;
	}

	public String getAddressComplement() {
		return addressComplement;
	}

	public void setAddressComplement(String addressComplement) {
		this.addressComplement = addressComplement;
	}
	
}
