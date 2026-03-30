<?php

use Inertia\Testing\AssertableInertia as Assert;

test('landing page renders the index component', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Index')
            ->has('canRegister')
        );
});
