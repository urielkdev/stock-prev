package stock.prev.operation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import stock.prev.user.User;

@RestController
public class OperationController {

	@Autowired
	private OperationService operationService;
	
	@RequestMapping("/operations/{cpf}")
	public List<Operation> getAllOperations(@PathVariable String cpf) {
		return operationService.getAllOperationsByUser(cpf);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/operations/{cpf}")
	public void addOperation(@RequestBody Operation operation, @PathVariable String cpf) {
		operation.setUser(new User(cpf));
		operationService.addOperation(operation);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/operations")
	public void updateOperation(@RequestBody Operation operacao) {
		// set the user of the 'old operation' and then update the operation
		operacao.setUser(operationService.getOperation(operacao.getId()).getUser());
		operationService.updateOperation(operacao);
	}	
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/operations/{id}")
	public void deleteOperation(@PathVariable Integer id) {
		operationService.deleteOperation(id);
	}

	@RequestMapping("/operations/{cpf}/balance/normal")
	public String getNormalBalance(@PathVariable String cpf) {
		return operationService.findNormalBalance(cpf);
	}

	@RequestMapping("/operations/{cpf}/balance/eventual")
	public String getEventualBalance(@PathVariable String cpf) {
		return operationService.findEventualBalance(cpf);
	}
}
