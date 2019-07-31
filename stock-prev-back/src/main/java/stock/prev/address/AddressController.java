package stock.prev.address;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

	@Autowired
	private AddressService addressService;
	
	@RequestMapping("/addresses")
	public List<Address> getAllAddresses() {
		return addressService.getAllAddresses();
	}
	
	@RequestMapping("/addresses/{id}")
	public Address getAddress(@PathVariable Integer id) {
		return addressService.getAddress(id);
	}

	@RequestMapping(method = RequestMethod.POST, value = "addresses")
	public Integer addAddress(@RequestBody Address address) {
		addressService.addAddress(address);
		return address.getAddressId();
	}


	@RequestMapping(method = RequestMethod.PUT, value = "/addresses")
	public void updateAddress(@RequestBody Address user) {
		addressService.updateAddress(user);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/addresses/{id}")
	public void deleteAddress(@PathVariable Integer id) {
		addressService.deleteAddress(id);
	}
}
