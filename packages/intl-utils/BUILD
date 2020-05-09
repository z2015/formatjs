package(default_visibility=["//visibility:public"])
load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary", "pkg_npm")

pkg_npm(
    name="@formatjs/intl-utils",
    srcs=["package.json"],
    deps=[":intl-utils"]
)

ts_library(
    name = "intl-utils",
    srcs = glob(["src/*.ts"]),
    module_root="src",
    module_name="@formatjs/intl-utils",
    prodmode_module = "commonjs",
    devmode_module = "commonjs",
)

ts_library(
    name = "cldr-lib",
    srcs = [
        "scripts/cldr.ts"
    ],
    prodmode_module = "commonjs",
    devmode_module = "commonjs",
    deps = [
        "@npm//serialize-javascript",
        "@npm//@types/serialize-javascript",
        "@npm//cldr-core",
        "@npm//@types/minimist",
        "@npm//minimist",
        "@npm//@types/node",
        "@npm//@types/fs-extra",
        "@npm//fs-extra"
    ]
)

nodejs_binary(
    name = "cldr-bin",
    data = [":cldr-lib"],
    entry_point = ":scripts/cldr.ts"
)

genrule(
    name = "cldr",
    outs = [
        "src/aliases.ts",
        "src/parentLocales.ts"
    ],
    cmd = "$(location cldr-bin) --aliases $(@D)/src/aliases.ts --parentLocales $(@D)/src/parentLocales.ts",
    tools = [":cldr-bin"]
)