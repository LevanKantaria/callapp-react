import Chart from "react-apexcharts";
import styled from "styled-components";
import useStore from "../../store";

interface CityWithCount {
  city: string;
  count: number;
}

const Wrapper = styled.section`
  padding: 2em 4em;
  background: hsl(0, 0%, 98%);
  border-radius: 10px;
  border-top: solid 2px rgb(248, 115, 118);
  width: 500px;

  margin: 80px auto 0px ;
`;

const Title = styled.h2`
  color: hsl(234, 12%, 34%);
  margin:  0px auto 50px auto;
  text-align: center;
`;

const ApexChart = () => {
  const users = useStore((state) => state.Users);

  let cityArray: string[] = [""];
  users.map((item) => cityArray.push(item.address.city));

  let CitiesWithCount = cityArray.reduce((accumulator: any, value) => {
    return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
  }, {});

  let cities = Object.keys(CitiesWithCount);
  cities.splice(0, 1);
  let count: any = [];
  count = Object.values(CitiesWithCount);
  count.splice(0, 1);
  const options = { labels: cities };
  const series = count; //our data

  return (
    <Wrapper>
      <Title>Users Per City</Title>
      <Chart options={options} series={series} width={380} type="pie" />
    </Wrapper>
  );
};

export default ApexChart;
