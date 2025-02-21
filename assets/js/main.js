(function() {
  "use strict";

  const KINDS = [
    { text: 'Module', color: 'purple' },
    { text: 'Constant', color: 'green' },
    { text: 'Type', color: 'yellow' },
    { text: 'Trait', color: 'yellow' },
    { text: 'Method', color: 'blue' },
    { text: 'Field', color: 'green' },
    { text: 'Constructor', color: 'blue' },
  ];

  // The amount of time to wait after the user stops typing, before showing the
  // search results.
  const DEBOUNCE = 300;

  class Query {
    constructor(input) {
      this.words = input.split(/\s+/);
      this.lower_words = this.words.map((word) => word.toLowerCase());
      this.case_sensitive = false;
      this.case_sensitive =
        this.words.find((word) => word != word.toLowerCase()) != null;
    }

    matches(text) {
      if (this.case_sensitive) {
        for (var i in this.words) {
          if (!text.includes(this.words[i])) { return false; }
        }
      } else {
        const lower_text = text.toLowerCase();

        for (var i in this.lower_words) {
          if (!lower_text.includes(this.lower_words[i])) { return false; }
        }
      }

      return true;
    }
  }

  class Search {
    constructor() {
      this.input = document.getElementById('search-input');
      this.content = document.getElementById('content');
      this.results = document.getElementById('search-results');
      this.no_results = this.results.querySelector('.no-results');
      this.table = this.results.querySelector('table tbody');
      this.rows = [];
      this.timer_id = null;

      // The JSON is loaded the first time the user focuses the input field, so
      // we only load it if we actually need to.
      this.input.addEventListener(
        'focus',
        async () => {
          const resp = await fetch(document.head.dataset.search);
          this.rows = await resp.json();

          this.input.addEventListener('input', () => this.inputChanged());
        },
        { once: true }
      );

      const search = document.getElementById('search');

      search.addEventListener('reset', () => this.reset());
      search.addEventListener('submit', (e) => {
        e.preventDefault();
        this.cancelTimer();
        this.showResults();
      })
    }

    cancelTimer() {
      if (this.timer_id) {
        clearTimeout(this.timer_id);
        this.timer_id = null;
      }
    }

    inputChanged() {
      this.cancelTimer();
      this.timer_id = setTimeout(() => { this.showResults(); }, DEBOUNCE);
    }

    reset() {
      this.table.replaceChildren();
      document.body.classList.remove('search-visible');
    }

    showResults() {
      const value = this.input.value.trim();

      if (value == '') {
        this.reset();
      } else {
        const query = new Query(value);
        const rows = [];

        this.rows.forEach((row) => {
          if (!query.matches(row.name)) { return; }

          let tr = document.createElement('tr');
          let kind_td = document.createElement('td');
          let label = document.createElement('span');
          let kind = KINDS[row.kind];

          kind_td.classList.add('min');
          label.classList.add('label');
          label.classList.add(kind.color);
          label.innerText = kind.text;
          kind_td.appendChild(label);

          let name_td = document.createElement('td');
          let name_link = document.createElement('a');
          let name_text = '';

          if (row.scope.length > 0) {
            name_text = `${row.scope}.${row.name}`
          } else {
            name_text = row.name
          }

          let rel = document.head.dataset.toRoot

          if (rel == '') { rel = '.'; }

          name_link.setAttribute('href', rel + row.link);
          name_link.setAttribute('title', name_text);
          name_link.innerText = name_text;
          name_link.addEventListener('click', (e) => {
            // If the base path is the same but the hash differs, there's no
            // page (re)load so we have to explicitly hide the search results.
            if (name_link.pathname == window.location.pathname) {
              this.input.value = '';
              this.reset();
            }
          });
          name_td.appendChild(name_link);

          let desc_td = document.createElement('td');

          desc_td.innerHTML = row.desc;

          tr.appendChild(kind_td);
          tr.appendChild(name_td);
          tr.appendChild(desc_td);
          rows.push(tr);
        });

        document.body.classList.add('search-visible');

        if (rows.length > 0) {
          this.no_results.classList.add('hide');
        } else {
          this.no_results.classList.remove('hide');
        }

        this.table.replaceChildren(...rows);
      }
    }
  }

  const setup_expanders = () => {
    document.querySelectorAll('#expand-menus a').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();

        const query = button.dataset.toggle;
        const new_text = button.dataset.toggleText;
        const old_text = button.innerText;

        button.dataset.toggleText = old_text;
        button.innerText = new_text;

        const el = document.querySelector(query);

        if (el) {
          el.classList.toggle('visible');
        }
      });
    });
  };

  const scroll_sidebar = () => {
    // Scroll the left sidebar such that the selected entry is roughly in the
    // middle of the container.
    const left = document.querySelector('#left > ul');
    const current = document.querySelector('#left .current');

    if (left && current) {
      const height = parseFloat(getComputedStyle(left).height);
      let padding = 100;

      if (height && height > 0) {
        padding = Math.round(height / 2);
      }

      left.scrollTop = current.offsetTop - padding;
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    setup_expanders();
    scroll_sidebar();
    new Search();
  });
})();
