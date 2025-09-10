# Comment Reporting Feature Implementation

## Overview
This implementation adds comment reporting functionality to the Polygonal Auxions platform, allowing users to report inappropriate comments similar to the existing artwork reporting feature.

## Implementation Status
✅ **COMPLETED:**
1. **Database Schema**: Added CommentRanks model to Prisma schema
2. **GraphQL Backend**: Added GraphQL types and mutations for comment reporting  
3. **Frontend Components**: Created CommentReportDialog and updated ArtworkCommentUnit
4. **GraphQL Operations**: Added AddCommentRank mutation definition

⏳ **PENDING (requires database setup):**
1. Run Prisma migration to create CommentRanks table
2. Uncomment CommentRanks GraphQL types in consts.ts
3. Update addCommentRank mutation to actually save data

## Files Changed

### Database
- `prisma/schema.prisma`: Added CommentRanks model with relations

### Backend GraphQL
- `src/server/graphql/types/consts.ts`: Added CommentRanks type (commented out), updated Comment type with ID
- `src/server/graphql/types/mutations/comments.ts`: Added addCommentRank mutation (temporary implementation)

### Frontend
- `src/components/CommentReportDialog.tsx`: New dialog component for comment reporting
- `src/components/artworks/ArtworkCommentUnit.tsx`: Added report button and functionality
- `src/graphql/mutations/comments.graphql`: Added AddCommentRank mutation
- `src/graphql/queries/comments.graphql`: Updated to include comment ID

## How to Complete the Implementation

### Step 1: Database Migration
```bash
# Apply the database migration
npx prisma migrate dev --name add-comment-ranks

# Generate Prisma client
npx prisma generate
```

### Step 2: Enable GraphQL Types
In `src/server/graphql/types/consts.ts`:
1. Uncomment the CommentRanks object definition
2. Uncomment the comment_ranks relation in Comment object

### Step 3: Update Backend Mutation
In `src/server/graphql/types/mutations/comments.ts`:
```typescript
// Replace the temporary implementation with:
builder.mutationField("addCommentRank", (t) =>
  t.prismaField({
    type: CommentRanks,
    authScopes: { isAuthenticated: true },
    args: { comment_slug_id: t.arg.string({ required: true }), rank_id: t.arg.string({ required: true }) },
    resolve: async (query, _parent, args, ctx) => {
      const targetComment = await prisma.comment.findFirst({ where: { slug_id: args.comment_slug_id } });
      if (!targetComment) throw new Error('コメントが見つかりません。');
      return prisma.commentRanks.create({
        ...query,
        data: { comment_id: targetComment.id, rank_id: parseInt(args.rank_id), user_id: ctx.auth?.id as number },
      });
    },
  })
);
```

### Step 4: Regenerate GraphQL Types
```bash
npx graphql-codegen
```

### Step 5: Update Frontend Component
In `src/components/artworks/ArtworkCommentUnit.tsx`:
- Replace the inline GraphQL mutation with the generated `AddCommentRankDocument`
- Use the generated `useAddCommentRankMutation()` hook

## Testing the Feature

### Manual Testing Steps
1. Start the development environment
2. Login as a user
3. Navigate to an artwork with comments
4. Find a comment from another user
5. Click the "報告" (Report) button
6. Select a report reason and submit
7. Verify success message appears
8. Check database for CommentRanks entry

### Database Verification
```sql
SELECT cr.*, c.body, r.name as reason, u.handle_name as reporter 
FROM comment_ranks cr
JOIN comments c ON cr.comment_id = c.id
JOIN ranks r ON cr.rank_id = r.id  
JOIN users u ON cr.user_id = u.id
ORDER BY cr.created_at DESC;
```

## Admin Interface Integration

The existing admin reports page (`src/pages/admin/reports.tsx`) already includes support for comment reports with `target_type: 'COMMENT'`. Once the backend is fully implemented, the admin interface should automatically display comment reports.

## Security Considerations

1. **Authentication Check**: Only logged-in users can report comments
2. **Self-Reporting Prevention**: Users cannot report their own comments  
3. **Duplicate Prevention**: CommentRanks table has unique constraint on (comment_id, rank_id, user_id)
4. **Input Validation**: comment_slug_id and rank_id are validated before processing

## Integration with Existing Features

This implementation reuses:
- Existing report reasons (RankTypeId=3) from the Ranks table
- ReportSuccessDialog component for success feedback
- Same toast notification pattern as artwork reporting
- Consistent Material-UI dialog styling

## Future Enhancements

1. **Report Count Display**: Show report count on comments (similar to likes/dislikes)
2. **Auto-hide Reported Comments**: Hide heavily reported comments automatically
3. **Admin Actions**: Allow admins to take action on reported comments directly
4. **Reporting History**: Show users their reporting history
5. **Appeal Process**: Allow comment authors to appeal reports