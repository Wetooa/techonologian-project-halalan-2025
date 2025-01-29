export default async function Home() {
  const response = await fetch("http://localhost:3000/api/all", {
    method: "GET",
  });
  const data = await response.json();

  console.log(data);

  return <div>Something</div>;
}
