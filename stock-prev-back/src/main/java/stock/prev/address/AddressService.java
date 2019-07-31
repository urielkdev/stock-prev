package stock.prev.address;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
	
	@Autowired
	private AddressRepository addressRepository;

	public List<Address> getAllAddresses() {
		List<Address> addresses = new ArrayList<>();
		addressRepository.findAll().forEach(addresses::add);
		return addresses;
	}

	public Address getAddress(Integer id) {
		return addressRepository.findOne(id);
	}

	public void addAddress(Address address) {
		addressRepository.save(address);
	}

	public void updateAddress(Address address) {
		addressRepository.save(address);
	}

	public void deleteAddress(Integer id) {
		addressRepository.delete(id);
	}
	
}
