def _generate_package_json(ctx):
    "A macro to generate package.json file"
    args = ctx.actions.args()
    args.add_all("--template", ctx.attr._template.files)
    args.add("--name", ctx.attr.module_name)
    args.add("--out", ctx.outputs.out)
    args.add("--description", ctx.attr.description)

    ctx.actions.run(
        outputs = [ctx.outputs.out],
        inputs = ctx.attr._template.files,
        arguments = [args],
        executable = ctx.executable._generate,
    )

generate_package_json = rule(
    implementation = _generate_package_json,
    attrs = {
        "out": attr.output(
            doc = "Result package.json",
            mandatory = True,
        ),
        "module_name": attr.string(mandatory = True),
        "description": attr.string(mandatory = True),
        "_template": attr.label(
            default = Label("//tools:package.template.json"),
            allow_single_file = True,
        ),
        "_generate": attr.label(
            default = Label("//tools:generate-package-json"),
            executable = True,
            cfg = "host",
        ),
    },
)
