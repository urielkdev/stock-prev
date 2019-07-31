package stock.prev.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import stock.prev.address.Address;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping("/users")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}
	
	@RequestMapping("/users/{id}")
	public User getUser(@PathVariable String id) {
		return userService.getUser(id);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/users/{addressId}")
	public void addUser(@RequestBody User user, @PathVariable Integer addressId) {
		user.setAddress(new Address(addressId));
		userService.addUser(user);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/users")
	public void updateUser(@RequestBody User user) {
		// set the address of the 'old user' and then update the user
		user.setAddress(userService.getUser(user.getCpf()).getAddress());
		userService.updateUser(user);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/users/{id}")
	public void deleteUser(@PathVariable String id) {
		userService.deleteUser(id);
	}
}
