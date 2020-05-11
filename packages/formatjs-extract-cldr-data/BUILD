load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("//tools:jest.bzl", "jest_test")
load("//tools:tools.bzl", "generate_package_json")
load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")
load("@npm_bazel_terser//:index.bzl", "terser_minified")

SRCS = glob(["src/*.ts"]) + [
    "index.ts",
]

PACKAGE_NAME = "formatjs-extract-cldr-data"

ts_library(
    name = PACKAGE_NAME,
    srcs = SRCS,
    devmode_module = "commonjs",
    module_name = PACKAGE_NAME,
    prodmode_module = "commonjs",
    deps = [
        "//packages/intl-utils:lib",
        "@npm//@types/glob",
        "@npm//@types/lodash",
        "@npm//@types/node",
        "@npm//cldr-core",
        "@npm//cldr-localenames-full",
        "@npm//cldr-misc-full",
        "@npm//cldr-numbers-full",
        "@npm//glob",
        "@npm//lodash",
    ],
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
    ],
)
