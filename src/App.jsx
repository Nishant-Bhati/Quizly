import './App.css'
import QuizHeader from './components/quiz/QuizHeader'
import ProgressBar from './components/quiz/ProgressBar';
import QuestionCard from './components/quiz/QuestionCard';
// import Home from './components/Home'
// import Quiz from './components/quiz/Quiz'

function App() {

  return (
    <div>
      {/* <Home/> */}
      {/* <Quiz/> */}
      <QuizHeader/>
      <ProgressBar current={3} total={10}/>
      <QuestionCard></QuestionCard>
      
    </div>
  )
}

export default App;
