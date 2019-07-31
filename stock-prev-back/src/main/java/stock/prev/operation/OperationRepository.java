package stock.prev.operation;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface OperationRepository extends CrudRepository<Operation, Integer> {

	public List<Operation> findByUserCpf(String cpf);
	
	//@Query("select sum(price.value) from Product p join p.prices price where  price.bookType = :book")
    //public BigDecimal sumPricesPerType(@Param("book") BookType book);

	@Query("from Operation where user.cpf = :cpf order by date")
	Iterable<Operation> findOperationsByUserCpf(@Param("cpf") String cpf);

	@Query("select sum(value) from Operation where type = 'normal' and user.cpf = :cpf")
	Double findNormalBalance(@Param("cpf") String cpf);
	
	@Query("select sum(value) from Operation where type = 'eventual' and user.cpf = :cpf")
	Double findEventualBalance(@Param("cpf") String cpf);
}
