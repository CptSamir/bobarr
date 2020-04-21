import React, { useState } from 'react';
import { FolderOpenOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import {
  TmdbSearchResult,
  EnrichedMovie,
  EnrichedTvShow,
} from '../../utils/graphql';

import { TVShowSeasonsModalComponent } from '../tvshow-seasons-modal/tvshow-seasons-modal.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

import { TMDBCardStyles } from './tmdb-card.styles';

interface TMDBCardComponentProps {
  type: 'tvshow' | 'movie';
  result: TmdbSearchResult | EnrichedMovie | EnrichedTvShow;
  inLibrary?: boolean;
}

export function TMDBCardComponent(props: TMDBCardComponentProps) {
  const { result, type, inLibrary } = props;
  const [isModalOpen, setIsModalOpen] = useState(result.tmdbId === 419704);

  return (
    <TMDBCardStyles vote={result.voteAverage * 10}>
      {/* display season picker modal when it's tvshow */}
      {type === 'tvshow' && isModalOpen && (
        <TVShowSeasonsModalComponent
          tvShow={result as TmdbSearchResult}
          visible={isModalOpen}
          inLibrary={inLibrary}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}

      {/* display movie details */}
      {type === 'movie' && isModalOpen && (
        <MovieDetailsComponent
          movie={result as TmdbSearchResult}
          visible={isModalOpen}
          inLibrary={inLibrary}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="poster--container" onClick={() => setIsModalOpen(true)}>
        <div
          className="poster"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w220_and_h330_face${result.posterPath})`,
          }}
        />
        <div className="overlay">
          <>
            <FolderOpenOutlined />
            <div className="action-label">See details</div>
          </>
        </div>
      </div>

      <div className="vote--container">
        <div className="vote" />
        <div className="percent">{result.voteAverage * 10}%</div>
      </div>

      <div className="name">{result.title}</div>
      {result.releaseDate && (
        <div className="date">
          {dayjs(result.releaseDate).format('DD MMM YYYY')}
        </div>
      )}
    </TMDBCardStyles>
  );
}
