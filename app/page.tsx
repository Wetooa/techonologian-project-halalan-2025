export default async function Home() {
  const response = await fetch("http://localhost:3000/api/by-senator/2", {
    method: "GET",
  });
  const data = await response.json();

  console.log(data);

  return <div>Something</div>;
}
