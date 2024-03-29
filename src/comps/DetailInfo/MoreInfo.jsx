import React, { useEffect, lazy, Suspense, useState, useMemo } from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import ReactPlayer from "react-player";
import {
  useGetVideoKeyQuery,
  useGetCastAndCrewQuery,
  useGetSimilarContentQuery,
} from "../../services/tmdbCore";
import RoundedShimmer from "../ShimmerUI/RoundedShimmer";
const Carousel = lazy(() => import("./Carousel"));
const MoreCarousel = lazy(() => import("./MoreCarousel"));

const MoreInfo = ({ id, type }) => {
  // const [videoKey, setVideoKey] = useState("");
  const { data: video, isFetching: isVideoFetching } = useGetVideoKeyQuery({
    type,
    id,
  });
  const { data: content } = useGetCastAndCrewQuery({ type, id });
  const { data: similarContent } = useGetSimilarContentQuery({ type, id });

  let videoKey = useMemo(() => {
    if (video && video?.results?.length) {
      let trailer = video?.results?.find((res) => res?.type === "Trailer");
      if (trailer) {
        return trailer?.key;
      } else {
        let teaser = video?.results?.find((res) => res.type === "Teaser");
        if (teaser) {
          return teaser?.key;
        } else {
          return video?.results[0].key;
        }
      }
    }
  }, [video]);

  return (
    <>
      <Box py={3} sx={{ backgroundColor: "#151515" }}>
        <Container maxWidth="md">
          {isVideoFetching ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              height={360}
              sx={{ bgcolor: "grey.900" }}
            />
          ) : (
            videoKey && (
              <ReactPlayer
                controls
                width="100%"
                url={`https://www.youtube.com/watch?v=${videoKey}`}
              />
            )
          )}
        </Container>
      </Box>

      <Divider color="gray" />
      {content && content?.cast?.length !== 0 ? (
        <>
          <Box py={1}>
            <Container maxWidth="lg">
              <Typography
                variant="h4"
                color="#fff"
                p={1}
                ml={2}
                fontWeight="bold"
              >
                Cast
              </Typography>
              <Suspense fallback={<RoundedShimmer />}>
                <Carousel carouselContent={content?.cast} />
              </Suspense>
            </Container>
          </Box>
          <Divider color="gray" />
        </>
      ) : null}
      {content && content?.crew?.length !== 0 ? (
        <>
          <Box py={1}>
            <Container maxWidth="lg">
              <Typography
                variant="h4"
                color="#fff"
                p={1}
                ml={2}
                fontWeight="bold"
              >
                Crew
              </Typography>
              <Suspense fallback={<RoundedShimmer />}>
                <Carousel carouselContent={content?.crew} />
              </Suspense>
            </Container>
          </Box>
          <Divider color="gray" />
        </>
      ) : null}
      {similarContent && similarContent?.results?.length !== 0 ? (
        <Box sx={{ paddingTop: "20px" }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              color="#fff"
              p={1}
              my={1}
              fontWeight="bold"
            >
              More like this
            </Typography>
            <Suspense fallback={<RoundedShimmer />}>
              <MoreCarousel type={type} content={similarContent?.results} />
            </Suspense>
          </Container>
        </Box>
      ) : null}
    </>
  );
};

export default React.memo(MoreInfo);
