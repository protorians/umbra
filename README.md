# Protorians Umbra

## Subtree Management

### Vauban Subtree

The project integrates the [Vauban repository](https://github.com/protorians/vauban.git) as a Git subtree in the `packages/vauban` directory. This approach allows us to incorporate Vauban's functionality while maintaining the ability to receive upstream updates and contribute back to the original repository.

#### Subtree Structure

- Location: `packages/vauban/`
- Remote: `vauban` (https://github.com/protorians/vauban.git)
- Branch: `main`

#### Pulling Updates from Vauban

To get the latest changes from the Vauban repository:

```bash
# Pull the latest changes from Vauban's main branch
git subtree pull --prefix=packages/vauban vauban main --squash
```

#### Pushing Changes Back to Vauban

If you make changes to the Vauban code that should be contributed back to the original repository:

```bash
# Push your changes to the Vauban repository
git subtree push --prefix=packages/vauban vauban main
```

#### Best Practices for Working with the Subtree

1. **Keep commits clean**: When making changes that affect both the main project and the Vauban subtree, consider separating these changes into distinct commits.

2. **Use descriptive commit messages**: When committing changes that affect the subtree, prefix your commit message with "vauban: " to make it clear that the changes are related to the subtree.

3. **Regular updates**: Periodically pull updates from the Vauban repository to stay in sync with upstream changes.

4. **Conflict resolution**: When pulling updates, conflicts may arise. Resolve them carefully, ensuring that your local modifications don't break Vauban's functionality.

5. **Testing after updates**: Always test your application after pulling updates from Vauban to ensure everything still works as expected.

6. **Documentation**: Document any significant changes you make to the Vauban code, especially if these changes deviate from the upstream version.
