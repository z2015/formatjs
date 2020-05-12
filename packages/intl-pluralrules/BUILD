load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary", "pkg_npm")
load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("//tools:jest.bzl", "jest_test")
load("//tools:tools.bzl", "generate_package_json", "rollup_dts", "compile_cldr")

package(default_visibility = ["//visibility:public"])

SRCS = [
    "index.ts",
    "polyfill.ts",
] + glob(["src/*.ts"])

SRCS_DEPS = [
    "//packages/intl-utils:lib"
]

PACKAGE_NAME = "intl-pluralrules"

pkg_npm(
    name = PACKAGE_NAME,
    deps = [
        "LICENSE.md",
        "%s.d.ts" % PACKAGE_NAME,
        "package.json",
        ":lib",
    ],
)

ts_library(
    name = "lib",
    srcs = SRCS,
    devmode_module = "commonjs",
    module_name = "@formatjs/%s" % PACKAGE_NAME,
    prodmode_module = "commonjs",
    deps=SRCS_DEPS
)

jest_test(
    name = "test",
    srcs = [
        "//:tsconfig.json",
    ] + SRCS + glob([
        "tests/**/*.ts",
        "tests/**/*.tsx",
        "tests/**/*.snap",
    ]),
    jest_config = "//:jest.config.js",
    tags = [
        # Need to set the pwd to avoid jest needing a runfiles helper
        # Windows users with permissions can use --enable_runfiles
        # to make this test work
        "no-bazelci-windows",
        # TODO: why does this fail almost all the time, but pass on local Mac?
        "no-bazelci-mac",
    ],
    deps = [
        "@npm//@jest/transform",
        "@npm//@types/jest",
        "@npm//ts-jest",
    ] + SRCS_DEPS,
)

generate_package_json(
    name = "generate-package-json",
    out = "package.json",
    description = "Polyfill for Intl.PluralRules",
    module_name = "@formatjs/%s" % PACKAGE_NAME,
)

# API Extractor
rollup_dts(
    name="d-ts",
    out="%s.d.ts" % PACKAGE_NAME,
    package_json="package.json",
    srcs=[":lib"]
)

ts_library(
    name="cldr-gen-lib",
    srcs=["scripts/cldr.ts"],
    devmode_module = "commonjs",
    prodmode_module = "commonjs",
    deps=[
        "@npm//minimist",
        "@npm//@types/minimist",
        "//packages/formatjs-extract-cldr-data:lib",
        "@npm//@types/node",
        "@npm//@types/fs-extra",
        "@npm//@types/serialize-javascript",
        "@npm//fs-extra",
        "@npm//serialize-javascript",
        "@npm//make-plural-compiler",
        "@npm//cldr-core"
    ]
)

nodejs_binary(
    name="cldr-gen",
    entry_point="scripts/cldr.ts",
    data=[":cldr-gen-lib"]
)

compile_cldr(
    name="compile-cldr",
    bin=":cldr-gen",
    deps=[
        ":cldr-gen-lib"
    ]
)