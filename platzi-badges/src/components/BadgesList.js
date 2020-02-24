import React from "react";
import { Link } from "react-router-dom";

import Gravatar from "./Gravatar";
import "./styles/BadgesList.css";

function useSearchBadges(badges) {
  const [query, setQuery] = React.useState("");
  const [filteredBadges, setFilteredBadges] = React.useState(badges);

  React.useMemo(() => {
    const result = badges.filter(badge => {
      if (query.length == 0) return true;
      return (
        badge.firstName.toLowerCase().includes(query) ||
        badge.lastName.toLowerCase().includes(query)
      );
    });

    setFilteredBadges(result);
  }, [badges, query]);


  return {query, setQuery, filteredBadges};
}

function BadgesList(props) {
  const badges = props.badges;

  const {query, setQuery, filteredBadges} = useSearchBadges(badges);

  return (
    <div className="BadgesList">
      <div className="form-group">
        <label>Filter Badges</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <ul className="list-unstyled">
        {filteredBadges.map(badge => {
          return (
            <li key={badge.id}>
              <Link
                to={`/badges/${badge.id}`}
                className="text-reset text-decoration-none"
              >
                <div className="BadgesListItem">
                  <Gravatar
                    className="BadgesListItem__avatar"
                    email={badge.email}
                  />
                  <div>
                    <strong>
                      {badge.firstName} {badge.lastName}
                    </strong>
                    <br />@{badge.twitter}
                    <br />
                    {badge.jobTitle}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BadgesList;
