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
  }

  if (lastQuestion) {
    questions[foundIndex].classList.remove('visible');
    nextBtn.classList.add('none');
    submitBtn.classList.remove('none');
  }

  if (questions[questions.length - 1] !== questions[foundIndex]) {
    questions[foundIndex].classList.remove('visible');
    questions[foundIndex + 1].classList.add('visible');
    backBtn.classList.remove('none');
  }
}

const amount = document.querySelector('.amount');
function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());
  backBtn.classList.add('none');
  submitBtn.classList.add('none');
  summaryStatus.classList.remove('visibleStatus');
  console.log(values);
  amount.textContent = `Loan amount: ${values.loanAmount}`;
}
