{# head.tpl #}
{% include "./inc/head.tpl" %}

<body>

<div class="row group">
    <div class="col col-12">
        {# header.tpl #}
        {% include "./inc/header.tpl" %}
    </div>
</div>
<main class="container">
    <div class="form">
        <div id="form"></div>
        <div id="list"></div>
        {# formView.tpl #}
        {% include "./modules/formView.tpl" %}
    </div>

    <div>
        {# userView.tpl #}
        {% include "./modules/userView.tpl" %}
    
        {# usersView.tpl #}
        {% include "./modules/usersView.tpl" %}
        <div class="listItem__placeholder">
            {# noUserList.tpl #}
            {% include "./modules/noUserList.tpl" %}
        </div>
    </div>

</main>

{# footer.tpl #}
{% include "./inc/footer.tpl" %}

