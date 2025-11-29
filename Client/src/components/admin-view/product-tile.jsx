import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setCurrentEditedId,
  setOpenCreateProductDialog,
  handleDelete,
}) {
  return (
    <Card className={"w-full max-w-sm pt-0 mx-auto"}>
      <div>
        <div className="relative">
          <img 
            src={product.image}
            alt={product.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold">{product.title}</h2>
          <div className="flex justify-between items-center">
            <span
              className={`${
                product.price > 0 ? "line-through" : ""
              }text-lg font-semibold text-primary`}
            >
              ${product.price}
            </span>
            <span className="text-lg font-bold">${product.salePrice}</span>
          </div>
        </CardContent>
        <CardFooter className={"flex justify-between items-center"}>
          <Button
            onClick={() => {
              setOpenCreateProductDialog(true);
              setCurrentEditedId(product._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
