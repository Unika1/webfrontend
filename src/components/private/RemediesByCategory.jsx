import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RemediesByCategory = ({ category }) => {
  const [remedies, setRemedies] = useState([]);

  useEffect(() => {
    // Fetch remedies based on the category
    fetch(`/api/remedies/${category}`)
      .then((response) => response.json())
      .then((data) => setRemedies(data))
      .catch((error) => console.error('Error fetching remedies:', error));
  }, [category]);

  return (
    <div>
      <h2>{category} Remedies</h2>
      <ul>
        {remedies.map((remedy) => (
          <li key={remedy.id}>{remedy.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RemediesByCategory;
