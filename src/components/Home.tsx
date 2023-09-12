import { Box, Button, styled, Stack } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import DiamondIcon from "@mui/icons-material/Diamond";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";

const CSSButton = styled(Button)({
  flex: 1,
  border: "2px solid red",
  borderRadius: 0,
});

interface Props {
  handleFilterCategory: (
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null,
    data?: string | null,
    categoryData?: string
  ) => void;
}

export default ({ handleFilterCategory }: Props) => {
  const images = [
    <Box src={image1} component="img" sx={{ objectFit: "contain" }} />,
    <Box src={image2} component="img" sx={{ objectFit: "contain" }} />,
    <Box src={image3} component="img" sx={{ objectFit: "contain" }} />,
  ];
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("store");
  }

  return (
    <Stack direction="column" sx={{ minHeight: "100vh" }}>
      <Carousel
        autoPlay
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        emulateTouch={true}
        stopOnHover={false}
      >
        {images.map((image, i) => (
          <Box key={i}>{image}</Box>
        ))}
      </Carousel>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        bgcolor="red"
        sx={{ flex: 1 }}
      >
        <CSSButton
          variant="contained"
          onClick={(e) => {
            handleFilterCategory(null, null, e.currentTarget.innerText);
            handleNavigate();
          }}
          startIcon={<DoneAllIcon />}
        >
          All
        </CSSButton>
        <CSSButton
          variant="contained"
          onClick={(e) => {
            handleFilterCategory(null, null, e.currentTarget.innerText);
            handleNavigate();
          }}
          startIcon={<PhoneAndroidIcon />}
        >
          Electronics
        </CSSButton>
        <CSSButton
          variant="contained"
          onClick={(e) => {
            handleFilterCategory(null, null, e.currentTarget.innerText);
            handleNavigate();
          }}
          startIcon={<DiamondIcon />}
        >
          Jewelery
        </CSSButton>
        <CSSButton
          variant="contained"
          onClick={(e) => {
            handleFilterCategory(null, null, e.currentTarget.innerText);
            handleNavigate();
          }}
          startIcon={<ManIcon />}
        >
          Men's Clothing
        </CSSButton>
        <CSSButton
          variant="contained"
          onClick={(e) => {
            handleFilterCategory(null, null, e.currentTarget.innerText);
            handleNavigate();
          }}
          startIcon={<WomanIcon />}
        >
          Women's Clothing
        </CSSButton>
      </Stack>
    </Stack>
  );
};
