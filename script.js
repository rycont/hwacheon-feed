let drawer = new mdc.drawer.MDCTemporaryDrawer(
  document.querySelector(".mdc-drawer--temporary")
);
document
  .querySelector(".menu")
  .addEventListener("click", () => (drawer.open = true));
const MDCSnackbar = mdc.snackbar.MDCSnackbar;
const MDCSnackbarFoundation = mdc.snackbar.MDCSnackbarFoundation;
const snackbar = new MDCSnackbar(document.querySelector(".mdc-snackbar"));

document.querySelectorAll(".meal .mdc-list-item").map((el) => {
  el.addEventListener(() => {
    snackbar.show({
      message: "관심 음식에 추가됨",
      actionText: "취소",
    });
  });
});

date = new Date();

function getMeal(year, month, date, callback) {
  fetch(
    `https://hwacheon.ml/getLunch?year=${year}&month=${month}&date=${date}&school=%ED%99%94%EC%B2%9C%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90&phase=4`
  )
    .then((e) => e.json())
    .then(callback);
}

function createCard(title, icon, subtitle, contents) {
  document.getElementsByClassName("container")[0].innerHTML += `
        <article class="mdc-card">
              <div class="titler">
                <section class="card-type-container">
                  <i class="material-icons card-type">${icon}</i>
                </section>
                <section>
                  <div class="title">${title}</div>
                  <div class="subtitle">${subtitle}</div>
                </section>
              </div>
              <div class="contents">${contents}</div>
        </article>
      `;
}

const Pue = (type, attrs) => {
  const el = document.createElement(type);
  if (attrs.children) {
    attrs.children.forEach((child) => el.appendChild(child));
  }
  Object.keys(attrs).forEach((key) => (el.key = attrs[key]));
};

Array(5)
  .fill()
  .map((_, index) => {
    getMeal(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate() + index,
      (data) => {
        if (data.err) {
          createCard(
            date.getMonth() + 1 + "월 " + (date.getDate() + i) + "일 급식",
            "restaurant",
            "점심",
            "급식 정보가 없습니다"
          );
        } else {
          createCard(
            date.getMonth() + 1 + "월 " + (date.getDate() + i) + "일 급식",
            "restaurant",
            "점심",
            Pue("ul", {
              className: "mdc-list mdc-list--two-line",
              children: data.lunch.map((allergyInfo, menu) =>
                Pue("li", {
                  className: "mdc-list-item",
                  children: Pue("span", {
                    className: "mdc-list-item__text",
                    innerHTML: menu,
                    children: Pue("span", {
                      className: "mdc-list-item__secondary-text",
                      innerHTML: allergyInfo,
                    }),
                  }),
                })
              ),
            }).outerHTML
          );
        }
      }
    );
  });
