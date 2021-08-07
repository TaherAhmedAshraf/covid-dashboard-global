import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";
import { useTheme } from "@emotion/react";

const Header = styled("div")({
  border: "1px solid #fff",
  margin: "1rem 0",
  padding: 30,
  borderRadius: 10,
  textAlign: "center",
});

const Title = styled(Typography)({
  fontSize: 20,
});
/* @ts-ignore */
const CovidCard = styled(Card)(({ theme, bgColor }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: 10,
  background: bgColor,
  paddingBottom: 50,
}));
/* @ts-ignore */
const CovidCardHeader = styled(CardHeader)(({ theme, bgColor }) => ({
  background: bgColor,
  color: "#fff",
  textAlign: "center",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
}));

const CovidCardContent = styled(CardContent)({
  paddingTop: 50,
});

const Holder = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const LineBreak = styled("hr")({
  border: 0,
  padding: 1,
  backgroundColor: "#fff",
  marginBottom: 30,
});

const FormControlStyled = styled(FormControl)({
  marginBottom: 20,
  border: "1px solid  #ddd",
  borderRadius: 4,
});

export async function getStaticProps() {
  const res = await fetch(`https://api.covid19api.com/summary`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: data }, // will be passed to the page component as props
  };
}

export default function Index({ data }: any) {
  const [country, setCountry] = useState("global");
  const theme = useTheme();
  const globalData = data.Global;
  const countryData = data.Countries;
  console.log(countryData[country]);
  if (country === "global") {
    console.log("global");
  }
  return (
    <Container>
      <Header>
        <Title>Best Covid Dashboard</Title>
      </Header>
      <FormControlStyled fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Age"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          <MenuItem value="global">Global</MenuItem>
          {data.Countries.map((country, index) => (
            <MenuItem key={country.Country} value={index}>
              {country.Country}
            </MenuItem>
          ))}
        </Select>
      </FormControlStyled>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          {/* @ts-ignore */}
          <CovidCard bgColor={theme.palette.primary.light}>
            <CovidCardHeader
              /* @ts-ignore */
              bgColor={theme.palette.primary.main}
              title="Confirmed"
            />
            <CovidCardContent>
              <Holder>
                <Typography>New Confirmed</Typography>
                <Typography>
                  {country === "global"
                    ? globalData.NewConfirmed
                    : countryData[country].NewConfirmed}
                </Typography>
              </Holder>
              <LineBreak />
              <Holder>
                <Typography>Total Confirmed</Typography>
                <Typography>
                  {country === "global"
                    ? globalData.TotalConfirmed
                    : countryData[country].TotalConfirmed}
                </Typography>
              </Holder>
              <LineBreak />
            </CovidCardContent>
          </CovidCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {/* @ts-ignore */}
          <CovidCard bgColor={theme.palette.error.light}>
            {/* @ts-ignore */}
            <CovidCardHeader bgColor={theme.palette.error.main} title="Death" />
            <CovidCardContent>
              <Holder>
                <Typography>New Deaths</Typography>
                <Typography>
                  {country === "global"
                    ? globalData.NewDeaths
                    : countryData[country].NewDeaths}
                </Typography>
              </Holder>
              <LineBreak />
              <Holder>
                <Typography>New Death</Typography>
                <Typography>
                  {country === "global"
                    ? globalData.TotalDeaths
                    : countryData[country].TotalDeaths}
                </Typography>
              </Holder>
              <LineBreak />
            </CovidCardContent>
          </CovidCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {/* @ts-ignore */}
          <CovidCard bgColor={theme.palette.secondary.light}>
            <CovidCardHeader
              /* @ts-ignore */
              bgColor={theme.palette.secondary.main}
              title="New Recovered"
            />
            <CovidCardContent>
              <Holder>
                <Typography>New Recovered</Typography>
                <Typography>
                  {country === "global"
                    ? globalData.NewRecovered
                    : countryData[country].NewRecovered}
                </Typography>
              </Holder>
              <LineBreak />
              <Holder>
                <Typography>Total Recovered</Typography>
                <Typography>
                  {country === "global"
                    ? globalData.TotalRecovered
                    : countryData[country].TotalRecovered}
                </Typography>
              </Holder>
              <LineBreak />
            </CovidCardContent>
          </CovidCard>
        </Grid>
      </Grid>
    </Container>
  );
}
