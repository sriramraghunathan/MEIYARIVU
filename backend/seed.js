const mongoose = require('mongoose');
const Question = require('./models/Question');
const Test = require('./models/Test');
require('dotenv').config();

const questions = [
  { questionText: "Who was the first President of the Indian National Congress?", options: ["Dadabhai Naoroji", "Womesh Chandra Bonnerjee", "Bal Gangadhar Tilak", "Gopal Krishna Gokhale"], correctIndex: 1, subject: "History", explanation: "Womesh Chandra Bonnerjee was the first President of the Indian National Congress in 1885." },
  { questionText: "Which Article of the Indian Constitution abolishes untouchability?", options: ["Article 14", "Article 15", "Article 17", "Article 19"], correctIndex: 2, subject: "Polity", explanation: "Article 17 abolishes untouchability and forbids its practice in any form." },
  { questionText: "The term 'Stagflation' refers to which economic condition?", options: ["High growth with low inflation", "Low growth with high inflation", "High growth with high inflation", "Low growth with low inflation"], correctIndex: 1, subject: "Economy", explanation: "Stagflation is a combination of stagnant economic growth, high unemployment, and high inflation." },
  { questionText: "Which river is known as the 'Sorrow of Bihar'?", options: ["Ganga", "Kosi", "Gandak", "Son"], correctIndex: 1, subject: "Geography", explanation: "The Kosi river is called the Sorrow of Bihar due to its frequent flooding." },
  { questionText: "The Preamble of the Indian Constitution was amended by which Constitutional Amendment?", options: ["42nd Amendment", "44th Amendment", "52nd Amendment", "86th Amendment"], correctIndex: 0, subject: "Polity", explanation: "The 42nd Amendment of 1976 added the words Socialist, Secular and Integrity to the Preamble." },
  { questionText: "Which Mughal emperor built the Taj Mahal?", options: ["Akbar", "Humayun", "Shah Jahan", "Aurangzeb"], correctIndex: 2, subject: "History", explanation: "The Taj Mahal was built by Shah Jahan in memory of his wife Mumtaz Mahal between 1632 and 1653." },
  { questionText: "The concept of 'Basic Structure' of the Constitution was propounded in which case?", options: ["Golak Nath Case", "Kesavananda Bharati Case", "Minerva Mills Case", "Maneka Gandhi Case"], correctIndex: 1, subject: "Polity", explanation: "The Basic Structure doctrine was propounded in the Kesavananda Bharati case of 1973." },
  { questionText: "Which gas is responsible for the greenhouse effect?", options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"], correctIndex: 2, subject: "Science", explanation: "Carbon Dioxide is the primary greenhouse gas responsible for trapping heat in the atmosphere." },
  { questionText: "The first Five Year Plan of India was based on which model?", options: ["Harrod-Domar Model", "Mahalanobis Model", "Solow Model", "Keynesian Model"], correctIndex: 0, subject: "Economy", explanation: "India's First Five Year Plan was based on the Harrod-Domar model focusing on agricultural development." },
  { questionText: "Which among the following is the largest ocean in the world?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correctIndex: 3, subject: "Geography", explanation: "The Pacific Ocean is the largest ocean covering about 46% of the world's water surface." },
  { questionText: "The Quit India Movement was launched in which year?", options: ["1940", "1941", "1942", "1943"], correctIndex: 2, subject: "History", explanation: "The Quit India Movement was launched by Mahatma Gandhi on 8 August 1942." },
  { questionText: "Which institution publishes the Human Development Index?", options: ["World Bank", "IMF", "UNDP", "WHO"], correctIndex: 2, subject: "Economy", explanation: "The HDI is published annually by the United Nations Development Programme (UNDP)." },
  { questionText: "The Tropic of Cancer passes through how many Indian states?", options: ["6", "7", "8", "9"], correctIndex: 2, subject: "Geography", explanation: "The Tropic of Cancer passes through 8 Indian states." },
  { questionText: "Which Article of the Constitution deals with the Right to Education?", options: ["Article 19", "Article 21", "Article 21A", "Article 23"], correctIndex: 2, subject: "Polity", explanation: "Article 21A makes free and compulsory education a fundamental right for children aged 6-14." },
  { questionText: "Who gave the slogan 'Jai Hind'?", options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose", "Bhagat Singh"], correctIndex: 2, subject: "History", explanation: "The slogan Jai Hind was given by Netaji Subhas Chandra Bose." },
  { questionText: "What is the minimum age to become the President of India?", options: ["25 years", "30 years", "35 years", "40 years"], correctIndex: 2, subject: "Polity", explanation: "According to Article 58, a person must be at least 35 years of age to become President." },
  { questionText: "Which river forms the boundary between India and Pakistan?", options: ["Indus", "Ravi", "Sutlej", "Chenab"], correctIndex: 0, subject: "Geography", explanation: "The Indus river forms a natural boundary between India and Pakistan." },
  { questionText: "The Green Revolution in India was introduced during which Five Year Plan?", options: ["Second Plan", "Third Plan", "Fourth Plan", "Fifth Plan"], correctIndex: 1, subject: "Economy", explanation: "The Green Revolution was introduced during India's Third Five Year Plan (1961-66)." },
  { questionText: "Which planet is known as the Blue Planet?", options: ["Mars", "Venus", "Earth", "Neptune"], correctIndex: 2, subject: "Science", explanation: "Earth is called the Blue Planet because 71% of its surface is covered with water." },
  { questionText: "The book 'Discovery of India' was written by?", options: ["Mahatma Gandhi", "B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"], correctIndex: 2, subject: "History", explanation: "Discovery of India was written by Jawaharlal Nehru in 1946." },
  { questionText: "Which Amendment reduced the voting age from 21 to 18 years?", options: ["42nd Amendment", "52nd Amendment", "61st Amendment", "73rd Amendment"], correctIndex: 2, subject: "Polity", explanation: "The 61st Constitutional Amendment Act of 1988 reduced the voting age to 18 years." },
  { questionText: "NITI Aayog replaced which planning body in India?", options: ["Finance Commission", "Planning Commission", "National Development Council", "Economic Advisory Council"], correctIndex: 1, subject: "Economy", explanation: "NITI Aayog replaced the Planning Commission on 1 January 2015." },
  { questionText: "Which is the longest river in India?", options: ["Yamuna", "Godavari", "Ganga", "Krishna"], correctIndex: 2, subject: "Geography", explanation: "The Ganga is the longest river in India with a total length of about 2,525 km." },
  { questionText: "The Battle of Plassey was fought in which year?", options: ["1757", "1764", "1775", "1780"], correctIndex: 0, subject: "History", explanation: "The Battle of Plassey was fought on 23 June 1757." },
  { questionText: "Which is the highest civilian award in India?", options: ["Padma Vibhushan", "Padma Bhushan", "Bharat Ratna", "Padma Shri"], correctIndex: 2, subject: "GK", explanation: "Bharat Ratna is the highest civilian award of India, instituted in 1954." }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    await Question.deleteMany({});
    await Test.deleteMany({});
    console.log('Cleared existing data');
    const inserted = await Question.insertMany(questions);
    console.log(`Inserted ${inserted.length} questions`);
    const subjects = ['History', 'Polity', 'Economy', 'Geography', 'Science', 'GK'];
    for (const subject of subjects) {
      const subjectQs = inserted.filter(q => q.subject === subject);
      if (subjectQs.length > 0) {
        await Test.create({ title: `UPSC ${subject} Mock Test`, subject, questions: subjectQs.map(q => q._id), durationMinutes: 15 });
        console.log(`Created test: UPSC ${subject} Mock Test`);
      }
    }
    await Test.create({ title: 'UPSC Full General Studies Mock Test', subject: 'General Studies', questions: inserted.map(q => q._id), durationMinutes: 30 });
    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();