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
  sendBtn,
  afterSubmitText,
  statusList,
  salaryInput,
  nameInput,
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

sendBtn.addEventListener('click', e => {
  e.target.classList.add('none');
  summaryContainer.classList.add('none');
  afterSubmitText.classList.remove('none');
  statusList.classList.add('none');
});

nameInput.addEventListener('keypress', e => {
  const words = e.keyCode >= 97 && e.keyCode <= 122;
  if (words) {
    nextBtn.removeAttribute('disabled');
    nameInput.classList.remove('error');
    nameInput.classList.add('success');
  } else {
    nextBtn.setAttribute('disabled', 'disabled');
    nameInput.classList.add('error');
    nameInput.classList.remove('success');
  }
});

salaryInput.addEventListener('keypress', e => {
  const numbers = e.keyCode >= 48 && e.keyCode <= 58;
  if (numbers) {
    nextBtn.removeAttribute('disabled');
    salaryInput.classList.remove('error');
    salaryInput.classList.add('success');
  } else {
    salaryInput.classList.add('error');
    salaryInput.classList.remove('success');
    nextBtn.setAttribute('disabled', 'disabled');
  }
});

questions.forEach(question => {
  question.addEventListener('input', e => {
    const value = e.target.value;
    const erroredAnswer = e.target.classList.contains('error');
    if (value) nextBtn.removeAttribute('disabled');
    if (erroredAnswer) nextBtn.setAttribute('disabled', 'disabled');
    if (value === '') {
      salaryInput.classList.remove('success');
      salaryInput.classList.remove('error');
      nameInput.classList.remove('success');
      nameInput.classList.remove('error');
      nextBtn.setAttribute('disabled', 'disabled');
    }
  });
});

function onBackBtn() {
  let foundIndex = null;
  const lastQuestion = questions[questions.length - 1];
  questions.forEach((question, index) => {
    const currentQuestion = question.classList.contains('visible');
    if (currentQuestion) {
      foundIndex = index;
    }
  });

  questions[foundIndex].classList.remove('visible');
  questions[foundIndex - 1].classList.add('visible');

  if (!foundIndex) {
    lastQuestion.classList.add('visible');
    submitBtn.classList.add('none');
    nextBtn.classList.remove('none');
    return;
  }

  if (foundIndex === 1) backBtn.classList.add('none');
  if (foundIndex === 8) {
    submitBtn.classList.add('none');
    nextBtn.classList.remove('none');
  }

  if (foundIndex < 5) {
    loanDataStatus.classList.add('visibleStatus');
    bioStatus.classList.remove('visibleStatus');
  }
  if (summaryStatus.classList.contains('visibleStatus')) {
    summaryStatus.classList.remove('visibleStatus');
    bioStatus.classList.add('visibleStatus');
  }

  nextBtn.removeAttribute('disabled');
}

function onNextBtn() {
  nextBtn.setAttribute('disabled', 'disabled');
  let foundIndex = null;
  const lastQuestion = questions[questions.length - 1];

  questions.forEach((question, index) => {
    const currentQuestion = question.classList.contains('visible');
    if (currentQuestion) foundIndex = index;
  });

  const currentQuestionIsLastQuestion = questions[foundIndex] === questions[questions.length - 1];

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

  if (currentQuestionIsLastQuestion) {
    questions[foundIndex].classList.add('visible');
  }

  if (lastQuestion !== questions[foundIndex]) {
    questions[foundIndex].classList.remove('visible');
    questions[foundIndex + 1].classList.add('visible');
    backBtn.classList.remove('none');
  }
}

const makeSummary = values =>
  summaryContainer.insertAdjacentHTML(
    'afterbegin',
    `
<p class="summary-title">Loan information</p>
<ul class="summary-list">
<li class="summary-item">
<p>Loan amount: <span class="summary-value">${values.loanAmount}</span></p>
</li>
<li class="summary-item">
<p>Loan term: <span class="summary-value">${values.loanTerm}</span></p>
</li>
<li class="summary-item">
<p>Purpose: <span class="summary-value">${values.purpose}</span></p>
</li>
<li class="summary-item">
<p>Your salary: <span class="summary-value">${values.salary}</span></p>
</li>
</ul>
<p class="summary-title">Personal Data</p>
<ul class="summary-list">
<li class="summary-item">
<p>Name and Surname: <span class="summary-value">${values.name}</span></p>
</li>
<li class="summary-item">
<p>Education level: <span class="summary-value">${values.education}</span></p>
</li>
<li class="summary-item">
<p>Your job sphere: <span class="summary-value">${values.job}</span></p>
</li>
<li class="summary-item">
<p>Time employed: <span class="summary-value">${values.workingTime}</span></p>
</li>
</ul>

<p class="summary-title">Comments: <span class="summary-value">${values.comments}</span></p>

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
