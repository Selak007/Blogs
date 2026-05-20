import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './index.css';
import useDarkMode from './hooks/useDarkMode';

// Components
const Header = ({ isDarkMode, onToggleDarkMode }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header>
      <Link to="/">
        <h1>BlogWrites</h1>
      </Link>
      <div className="header-actions">
        <nav>
          <ul>
            <li><Link to="/" className={isActive('/')}>Home</Link></li>
            <li><Link to="/about" className={isActive('/about')}>About</Link></li>
            <li><Link to="/blogs" className={isActive('/blogs')}>Blogs</Link></li>
          </ul>
        </nav>
        <button
          type="button"
          className="theme-toggle"
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
          onClick={onToggleDarkMode}
        >
          <span aria-hidden="true">{isDarkMode ? '☀️' : '🌙'}</span>
          <span className="sr-only">Toggle dark mode</span>
        </button>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer>
    <p>&copy; {new Date().getFullYear()} BlogWrites. All rights reserved.</p>
  </footer>
);

// Data
const animals = [
  { id: 'cat', name: 'Cat', image: '/images/cat.jpg', desc: 'Cats are small, carnivorous mammals.', fullDesc: 'Cats are fascinating animals with rich personalities and a long history of domestication.', characteristics: ['Small size', 'Agile and graceful', 'Keen senses, especially hearing and sight'], likes: ['Enjoys napping', 'Loves to hunt'], fact: 'Cats spend 70% of their lives sleeping.' },
  { id: 'dog', name: 'Dog', image: '/images/dog.jpg', desc: 'Dogs are domesticated mammals loved for their loyalty.', fullDesc: 'Dogs are known as man\'s best friend, bred for various tasks and companionship.', characteristics: ['Loyal and protective', 'Highly trainable', 'Excellent sense of smell'], likes: ['Playing fetch', 'Going for walks'], fact: 'A dog\'s sense of smell is 10,000 to 100,000 times more sensitive than a human\'s.' },
  { id: 'lion', name: 'Lion', image: '/images/lion.jpg', desc: 'Lions are large carnivorous mammals found in Africa and Asia.', fullDesc: 'Lions are the kings of the jungle, living in social groups called prides.', characteristics: ['Large size and strength', 'Majestic mane (males)', 'Social structure'], likes: ['Resting in the shade', 'Hunting cooperatively'], fact: 'A lion\'s roar can be heard up to 5 miles away.' },
  { id: 'tiger', name: 'Tiger', image: '/images/tiger.jpg', desc: 'Tigers are the largest wild cats in the world, known for their striped coats.', fullDesc: 'Tigers are powerful solitary hunters, easily recognizable by their dark vertical stripes on reddish-orange fur.', characteristics: ['Distinctive stripes', 'Exceptional swimmers', 'Solitary nature'], likes: ['Swimming to cool off', 'Stalking prey'], fact: 'No two tigers have the exact same stripe pattern.' },
  { id: 'goat', name: 'Goat', image: '/images/goat.jpg', desc: 'Goats are adaptable animals, known for their curiosity and intelligence.', fullDesc: 'Goats are one of the oldest domesticated species, known for their climbing abilities and curious nature.', characteristics: ['Horns (most breeds)', 'Agile climbers', 'Inquisitive behavior'], likes: ['Exploring new terrain', 'Foraging for food'], fact: 'Goats have rectangular pupils, giving them a 320 to 340-degree field of vision.' },
  { id: 'deer', name: 'Deer', image: '/images/deer.jpg', desc: 'Deer are graceful animals known for their agility and beauty.', fullDesc: 'Deer are hoofed ruminant mammals that are widely distributed across the globe.', characteristics: ['Antlers (males usually)', 'Slender bodies', 'Exceptional agility'], likes: ['Grazing in meadows', 'Running fast'], fact: 'Deer can jump up to 10 feet high and 30 feet in length.' },
  { id: 'sloth', name: 'Sloth', image: '/images/sloth.jpg', desc: 'Sloths are arboreal mammals noted for slowness of movement.', fullDesc: 'Sloths spend most of their lives hanging upside down in the trees of the tropical rainforests.', characteristics: ['Slow movement', 'Long claws', 'Algae-covered fur (for camouflage)'], likes: ['Sleeping', 'Hanging from branches'], fact: 'Sloths only come down from their trees about once a week.' }
];

// Pages
const Home = () => {
  return (
    <div className="page-content" style={{ padding: 0, background: 'transparent', boxShadow: 'none' }}>
      <h2>Featured Animals</h2>
      <div className="animal-grid">
        {animals.map((animal) => (
          <Link to={`/animal/${animal.id}`} key={animal.id} className="animal-card">
            <img src={animal.image} alt={animal.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=' + animal.name; }} />
            <div className="animal-card-content">
              <h3>{animal.name}</h3>
              <p>{animal.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Animal = () => {
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const animal = animals.find(a => a.id === id);

  if (!animal) {
    return (
      <div className="page-content">
        <h1>Animal Not Found</h1>
        <p>Sorry, we couldn't find the animal you're looking for.</p>
        <Link to="/" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Return Home</Link>
      </div>
    );
  }

  return (
    <div className="page-content">
      <h1>All About {animal.name}s</h1>
      <p>{animal.fullDesc}</p>
      
      <h2>Characteristics</h2>
      <ul>
        {animal.characteristics.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
      
      <h2>Likes</h2>
      <ul>
        {animal.likes.map((l, i) => <li key={i}>{l}</li>)}
      </ul>
      
      <h2>Fun Fact</h2>
      <p>{animal.fact}</p>
    </div>
  );
};

const About = () => (
  <div className="page-content">
    <h1>About BlogWrites</h1>
    <p>Welcome to BlogWrites, a modern blog about fascinating animals. We explore the lives, habits, and fun facts about various creatures in the animal kingdom.</p>
  </div>
);

const Blogs = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Attempt to fetch from backend, fallback to local data
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback mock data if backend is not running
        setBlogs([
          {title: 'All About Cats', content: 'Cats are small, carnivorous mammals.'},
          {title: 'All About Dogs', content: 'Dogs are domesticated mammals loved for their loyalty.'},
          {title: 'All About Lions', content: 'Lions are large carnivorous mammals found in Africa and Asia.'},
          {title: 'All About Tigers', content: 'Tigers are the largest wild cats in the world with distinct orange coats and black stripes.'},
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-content">
      <h1>Latest Blogs</h1>
      {loading ? <p>Loading blogs...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {blogs.map((b, i) => (
            <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <h3 style={{ color: 'var(--primary-color)', marginTop: 0 }}>{b.title}</h3>
              <p style={{ marginBottom: 0 }}>{b.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main App component
function App() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <Router>
      <div className="app-container">
        <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/animal/:id" element={<Animal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
