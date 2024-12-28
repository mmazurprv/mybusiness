import AddItemForm from "@/components/warehouse/add-item-form";

export default function Page() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Add new item to the Warehouse
      </h1>
      <AddItemForm />
    </div>
  );
}
