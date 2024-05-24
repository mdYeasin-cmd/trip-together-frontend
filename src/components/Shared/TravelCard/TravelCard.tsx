import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EventIcon from "@mui/icons-material/Event";

const TravelCard = () => {
  return (
    <Card sx={{ maxWidth: "99%" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={
          "https://cdn.pixabay.com/photo/2018/03/20/14/00/sea-3243357_1280.jpg"
        }
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center" }}
        >
          Cox&apos;s Bazar
        </Typography>

        <Typography
          component={"p"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 1,
          }}
        >
          <EventIcon />
          <Typography component={"span"}>22-05-2024</Typography>
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "justify" }}
        >
          Escape to Cox&apos;s Bazar, Bangladesh, where endless golden sands
          meet the Bay of Bengal. Immerse yourself in the world&apos;s longest
          natural beach, perfect for relaxation, adventure, and cultural
          exploration.
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
        <Button>View Details</Button>
      </CardActions>
    </Card>
  );
};

export default TravelCard;
