import {
  questions,
  nextBtn,
  submitBtn,
  form,
  backBtn,
  amountSlider,
  amountSliderValue,
  termSlider,
  termSliderValue,
  loanDataStatus,
  bioStatus,
  summaryStatus,
  summaryContainer,
  formContainer,
} from './refs.js';

nextBtn.addEventListener('click', onNextBtn);
form.addEventListener('submit', onSubmit);
backBtn.addEventListener('click', onBackBtn);

amountSlider.addEventListener('input', e => {
  amountSliderValue.innerHTML = e.target.value;
});

termSlider.addEventListener('input', e => {
  termSliderValue.innerHTML = e.target.value;
});

questions.forEach(el => {
  el.addEventListener('input', e => {
    if (e.target.value) nextBtn.removeAttribute('disabled');
  });
});

function onBackBtn() {
  let foundIndex = null;
  questions.forEach((question, index) => {
    if (question.classList.contains('visible')) {
      foundIndex = index;
    }
  });

  if (!foundIndex) {
    questions[questions.length - 1].classList.add('visible');
    submitBtn.classList.add('none');
    nextBtn.classList.remove('none');
    return;
  }

  questions[foundIndex].classList.remove('visible');
  questions[foundIndex - 1].classList.add('visible');

  if (foundIndex === 1) backBtn.classList.add('none');

  if (foundIndex < 5) {
    loanDataStatus.classList.add('visibleStatus');
    bioStatus.classList.remove('visibleStatus');
  }
  if (summaryStatus.classList.contains('visibleStatus')) {
    summaryStatus.classList.remove('visibleStatus');
    bioStatus.classList.add('visibleStatus');
  }
}

function onNextBtn() {
  nextBtn.setAttribute('disabled', 'disabled');
  let foundIndex = null;

  questions.forEach((question, index) => {
    if (question.classList.contains('visible')) foundIndex = index;
  });

  const lastQuestion = questions[foundIndex] === questions[questions.length - 1];

  if (!foundIndex && foundIndex !== 0) return;

  if (foundIndex === 3) {
    loanDataStatus.classList.remove('visibleStatus');
    bioStatus.classList.add('visibleStatus');
  }

  if (questions[foundIndex] === questions[questions.length - 2]) {
    bioStatus.classList.remove('visibleStatus');
    summaryStatus.classList.add('visibleStatus');
    submitBtn.removeAttribute('disabled');
    nextBtn.classList.add('none');
    submitBtn.classList.remove('none');
  }

  if (lastQuestion) {
    questions[foundIndex].classList.add('visible');
  }

  if (questions[questions.length - 1] !== questions[foundIndex]) {
    questions[foundIndex].classList.remove('visible');
    questions[foundIndex + 1].classList.add('visible');
    backBtn.classList.remove('none');
  }
}

const makeSummary = values =>
  summaryContainer.insertAdjacentHTML(
    'afterbegin',
    `
<p>Loan information</p> 
<p>Loan amount: <span>${values.loanAmount}</span></p>
<p>Loan term: <span>${values.loanTerm}</span></p>
<p>Purpose: <span>${values.purpose}</span></p>
<p>Your salary: <span>${values.salary}</span></p>
<p>Personal Data</p>
<p>Name and Surname: <span>${values.name}</span></p>
<p>Education level: <span>${values.education}</span></p>
<p>Your job sphere: <span>${values.job}</span></p>
<p>Time employed: <span>${values.workingTime}</span></p>
<p>Comments: <span>${values.comments}</span></p> 
`,
  );

function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());
  formContainer.classList.add('none');
  summaryContainer.classList.remove('none');
  makeSummary(values);
}
