import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EventIcon from "@mui/icons-material/Event";
import { TTrip } from "@/types";
import { dateFormatter } from "@/utils/dateFormater";
import Link from "next/link";

type TProps = {
  post: TTrip;
};

const TravelCard = ({ post }: TProps) => {
  const { id, destination, description, startDate, endDate, photos } = post;

  return (
    <Card sx={{ maxWidth: "99%", height: "500px" }}>
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
          {description?.length > 180
            ? `${description.slice(0, 180)}...`
            : `${description} ${" ".repeat(180)}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
        <Link href={`/travels/${id}`}>
          <Button>View Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default TravelCard;
