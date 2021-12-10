<template>
  <div v-if="reviews" class="breakdown-container">
    <div class="table-stars-container">
      <table class="stars-table">
        <tbody style="display: flex; flex-direction: column-reverse">
          <tr v-for="(num, idx) in 5" :key="idx">
            <td class="star-filter">
              <button>{{ num }} Stars</button>
            </td>
            <td class="progress-bar-container">
              <div class="star-progress-bar">
                <div class="grey">
                  <span
                    class="progress"
                    :style="{ width: `${progressBar(num)}%` }"
                  ></span>
                </div>
              </div>
            </td>
            <td>
              <div class="star-num">({{ starNum(num) }})</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rating-breakdown">
      <h5 class="title">Rating Breakdown</h5>
      <ul>
        <li>
          Seller communication level<span
            >4.9<span class="fa fa-star"></span
          ></span>
        </li>
        <li>
          Recommend to a friend<span>4.1<span class="fa fa-star"></span></span>
        </li>
        <li>
          Service as described<span>4.5<span class="fa fa-star"></span></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  name: "gig-reviews-breakdown",
  props: ["reviews"],
   methods: {
    progressBar(num) {
      const amount = +this.reviews.reduce((acc, review) => {
        if (Math.round(review.rate) === num) acc++;
        return acc;
      }, 0);
      return (amount / this.reviews.length) * 100;
    },
    starNum(num) {
      const amount = +this.reviews.reduce((acc, review) => {
        if (Math.round(review.rate) === num) acc++;
        return acc;
      }, 0);
      return amount;
    },
   }
};
</script>
