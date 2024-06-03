import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EventIcon from "@mui/icons-material/Event";
import { TTrip } from "@/types";
import { dateFormatter } from "@/utils/dateFormater";

type TProps = {
  post: TTrip;
};

const TravelCard = ({ post }: TProps) => {
  const { destination, description, startDate, endDate, photos } = post;

  return (
    <Card sx={{ maxWidth: "99%" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={photos?.[0]}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center" }}
        >
          {destination}
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
          <Typography component={"span"} sx={{ marginLeft: "5px" }}>
            {dateFormatter(startDate)} - {dateFormatter(endDate)}
          </Typography>
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "justify" }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
        <Button>View Details</Button>
      </CardActions>
    </Card>
  );
};

export default TravelCard;
