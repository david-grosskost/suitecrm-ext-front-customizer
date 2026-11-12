<?php

// Personnalisation de l'interface (extension front-customizer): declares its
// Angular module to SuiteCRM 8, which loads it when the interface starts
// (module federation). The module (public/, built from app/ by make
// front@build) is under extensions/FrontCustomizer/ in SuiteCRM: the slug in
// PascalCase. Enabled: the extension's files are there only when it is active
// (EXTENSIONS of the instance).

declare(strict_types=1);

use Symfony\Component\DependencyInjection\Container;

if (!isset($container)) {
    return;
}

/** @var Container $container */
$extensions = $container->getParameter('extensions');
$extensions = is_array($extensions) ? $extensions : [];

$extensions['FrontCustomizer'] = [
    'remoteEntry' => '../extensions/FrontCustomizer/remoteEntry.js',
    'remoteName' => 'FrontCustomizer',
    'enabled' => true,
    'extension_name' => 'Personnalisation de l\'interface',
    'extension_uri' => 'https://github.com/david-grosskost/suitecrm-ext-front-customizer',
    'description' => 'Montants au format français : symbole après le nombre.',
    'version' => '0.1.0',
    'author' => 'David Grosskost',
    'author_uri' => 'https://david-grosskost.fr',
    'license' => 'proprietary',
];

$container->setParameter('extensions', $extensions);
